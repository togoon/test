// React
let a = {n:1}
/*
 * a.x里的a，取的还是原来的对象{n:1}
 * 所以最终执行后，a = {n:2}
 */
a.x = a = {n:2}

console.log('a.x', a.x) // 输出undefined
