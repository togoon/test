/*
 * 一个完全pure的柯里化的mul
 */
function mul(x) {
  let cache = x
  function op(y) {
    return mul(y*x)
  }
  op.toString = ()=>cache

  return op
}

const m2 = mul(2)
console.log(m2(3))
console.log(m2(4)) 
console.log(m2(5)(6))
