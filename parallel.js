const {
    Worker, isMainThread, parentPort, workerData
} = require("node:worker_threads");

let newarr = function(n){
    let arr = [];
    for(let i = 0; i < n; i++){
        arr.push(0);
    }
    return arr;
};

const Parallel = {
    poolcnt:8,
    foreach:function(arr,cb){
        let workerstr = `
        const {parentPort} = require("node:worker_threads");
        const mapper = ${cb.toString()};
        parentPort.on("message",async ([val,i])=>{
            let result = mapper(val,i);
            if(result instanceof Promise){
                result = await result;
            }
            parentPort.postMessage(result);
        });
        `;
        let i = 0;
        let activeThreads = 0;
        let result = arr.map(v=>0);
        return new Promise((res,rej)=>{
            //anonymous pool
            let workers = [];
            newarr(this.poolcnt).map(async (_,tn)=>{
                let worker = new Worker(workerstr,{eval:true});
                workers.push(worker);
                while(i < arr.length){
                    let ii = i;
                    i++;
                    activeThreads++;
                    worker.postMessage([arr[ii],ii]);
                    result[ii] = await new Promise((res,rej)=>{
                        worker.once("message",res);
                    });
                    activeThreads--;
                    if(activeThreads === 0){
                        //destroy all threads
                        workers.map(w=>w.terminate());
                        res(result);
                    }
                }
            });
        });
    }
};

let FakeParallel = {
    foreach(arr,cb){
        return new Promise((res,rej)=>{
            res(arr.map(cb));
        });
    }
};

module.exports = {Parallel,FakeParallel,newarr};









