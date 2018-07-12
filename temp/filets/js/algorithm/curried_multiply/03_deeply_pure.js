/*
 * 一个完全pure的柯里化的mul
 * 重点：
 * > mul对象调用一次之后，会返回其自身的一个副本，如何实现？
 */

function mul(x) {
  function closure(x) {
    let cache = x
    function op(y) {
      cache *= y
      return closure(cache)
    }
    op.toString = ()=>cache
    return op
  }

  return closure(x)
}

const m2 = mul(2)
console.log(m2(3))
console.log(m2(4)) // 这里还是不能重复使用
