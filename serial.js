let {Parallel,FakeParallel,newarr} = require("./parallel.js");


let main = async function(){
    console.log("starting");
    let result = await FakeParallel.foreach(newarr(100),(_,v)=>{
        //some intensive calculation
        let vv = v;
        for(let i = 0; i < 10000000; i++){
            vv += v;
            vv %= 6239;
        }
        return vv;
    });
    console.log(result);
};

main();