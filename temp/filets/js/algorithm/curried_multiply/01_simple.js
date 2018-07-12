let cache = 1
function mul(x) {
  cache *= x
  return mul
}

mul.toString = ()=>cache

console.log(mul(2)(3)(4))

// 第二次调用就不行了
console.log(mul(2))
