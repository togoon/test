// React
/*
 * 演示一个decorator的使用
 */

// 手写一个decorator，作用到一个类（或者对象）的方法上
const log = (target, name, descriptor)=>{
  console.log("decorator", target, name, descriptor)
  /*
   * 三个参数为target, name, descriptor
   * 其实还是很晦涩，暂时不去深究其用意
   */

  /*
   * 如果该装饰器是用来修饰类，则target就是其修饰的类
   * 如果装饰器修饰的是类或者对象的方法，则要取descriptor.value
   */
  const {value} = descriptor

  descriptor.value = (...para)=>{ // 将其重新包装。这里才是装饰器的核心逻辑
    console.log("hello")
    return value(...para)
  }

  // 这里照着阮一峰的示例写的，用意不明。似乎不需要这一句
  return descriptor
}

const add = (t, n, d)=>{
  console.log("add", t, n, d)
  d.value = 888
  console.log("d", d)
  return d
}

const a = {
  @add b:1, // 这样子使用是无效的

  @log // 使用上装饰器
  f() {
    console.log("f")
  }
}

a.f()
console.log("a.b", a.b)
