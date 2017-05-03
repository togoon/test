/*
 * 演示ramda库中 map, transduce 和 into的使用
 */
import R from 'ramda'

var arr = [1, 2, 3, 4]

// 变换: 此处为了演示，对其+1，通常由map来包裹一个普通函数得到
const transducer = R.map(x=>x+1)

let res

/*
 * transducer可以直接作用于数组，这也是map的最常规用法
 */
res = transducer(arr)
console.log("res", res)

/*
 * 如果初始数组不为空，可以使用into. [但个人感觉into方法的提炼不具备一般性，并不常用]
 */
res = R.into([1,], transducer, arr) // 同样初始数组也可不为空
console.log("res", res)

/*
 * transduce：可以自定义累积的行为，而不一定是默认的数组append
 * 为了演示transduce相对于reduce的更一般化，这里指定在每个元素中插入一个0
 */
var reducer = (arr, x)=>[...arr,0,x]

res = R.transduce(transducer, reducer, ['begin'], arr) // 为了演示一般性，这里令初始数组不为空
console.log("res", res)






