# Parallel.js
* `parallel.js`: contains the module code  
* `test_parallel.js`: contains an intense numerical mapping code  
* `test_serial.js`: contains serial equivalent of test_parallel.js  

# Example
```js
let result = await Parallel.foreach(
    //array to be mapped over
    [1,2,3,4],
    //this function will run in the worker thread
    (v,i)=>{
        return v*2;
    }
);
//prints [2,4,6,8]
console.log(result);
```

# API
This library is still in-dev, so the API is prone to change.  
`parallel.js` module provides three module members, namely `{Parallel,FakeParallel,newarr}`.  
* `Parallel` provides the main API  
* `FakeParallel` provides a mirrored serial API for performance testing purposes.  
* `newarr(n)` is a utility function that creates a zero filled array of size `n`.  

## Methods
### async Parallel.foreach(array,callback(value,index))
Pretty self explanatory. It maps the array using the callback with their return values just like `Array.map(callback)`.

# Performance/Execution results
## test_parallel.js
```
$ time node test_parallel.js
starting
[
     0, 5123, 4007, 2891, 1775,  659, 5782, 4666, 3550, 2434,
  1318,  202, 5325, 4209, 3093, 1977,  861, 5984, 4868, 3752,
  2636, 1520,  404, 5527, 4411, 3295, 2179, 1063, 6186, 5070,
  3954, 2838, 1722,  606, 5729, 4613, 3497, 2381, 1265,  149,
  5272, 4156, 3040, 1924,  808, 5931, 4815, 3699, 2583, 1467,
   351, 5474, 4358, 3242, 2126, 1010, 6133, 5017, 3901, 2785,
  1669,  553, 5676, 4560, 3444, 2328, 1212,   96, 5219, 4103,
  2987, 1871,  755, 5878, 4762, 3646, 2530, 1414,  298, 5421,
  4305, 3189, 2073,  957, 6080, 4964, 3848, 2732, 1616,  500,
  5623, 4507, 3391, 2275, 1159,   43, 5166, 4050, 2934, 1818
]

real	0m0.991s
user	0m4.497s
sys	0m0.053s
```
## test_serial.js
```
$ time node test_serial.js
starting
[
     0, 5123, 4007, 2891, 1775,  659, 5782, 4666, 3550, 2434,
  1318,  202, 5325, 4209, 3093, 1977,  861, 5984, 4868, 3752,
  2636, 1520,  404, 5527, 4411, 3295, 2179, 1063, 6186, 5070,
  3954, 2838, 1722,  606, 5729, 4613, 3497, 2381, 1265,  149,
  5272, 4156, 3040, 1924,  808, 5931, 4815, 3699, 2583, 1467,
   351, 5474, 4358, 3242, 2126, 1010, 6133, 5017, 3901, 2785,
  1669,  553, 5676, 4560, 3444, 2328, 1212,   96, 5219, 4103,
  2987, 1871,  755, 5878, 4762, 3646, 2530, 1414,  298, 5421,
  4305, 3189, 2073,  957, 6080, 4964, 3848, 2732, 1616,  500,
  5623, 4507, 3391, 2275, 1159,   43, 5166, 4050, 2934, 1818
]

real	0m3.626s
user	0m3.614s
sys	0m0.008s
```
