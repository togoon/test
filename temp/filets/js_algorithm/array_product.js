/*
 * 实现多个数组的'相乘'
 */

function product(a, b) {
  return a.map(i => b.map(j => i+j)).reduce((a, c)=>a.concat(c), [])
}

function reducer(...p) {
  return p.reduce(product, [''])
}

console.log(reducer(['a', 'b', 'c'], ['d', 'e'], ['e', 'f']))
