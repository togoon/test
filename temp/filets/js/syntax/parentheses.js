// React
const a = {
  x : 1,
  f(){
    return this.x
  }
}

console.log((a.f)()) // 这里能正常返回1是因为被js引擎优化了
console.log((1, a.f)()) // 会报错
