/*
 * 演示一个decorator的使用
 */

// 手写一个decorator，作用到一个类（或者对象）的方法上
const log = (target, name, descriptor)=>{
  /*
   * 三个参数为target, name, descriptor
   * 其实还是很晦涩，暂时不去深究其用意
   */

  // 在本例里，descriptor.value才是我们要修饰的方法，将其取出
  const {value} = descriptor

  descriptor.value = (...para)=>{ // 将其重新包装。这里才是装饰器的核心逻辑
    console.log("hello")
    return value(...para)
  }

  // 这里照着阮一峰的示例写的，用意不明。似乎不需要这一句
  return descriptor
}

const a = {
  @log // 使用上装饰器
  f() {
    console.log("f")
  }
}

a.f()
