/*
 * 令mul可以重复被调用
 */
function mul(x) {
  let cache = x
  function op(x) {
    cache *= x
    return op
  }
  op.toString = ()=>cache
  return op
}

console.log(mul(2)(3)(4))
console.log(mul(5)(6)(7))

const m2 = mul(2)
console.log(m2(3))
console.log(m2(4)) // 这里还是不能重复使用
