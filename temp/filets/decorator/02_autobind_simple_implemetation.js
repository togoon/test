// React

/*
 * 演示一个功能极其弱的autobind装饰器的实现（暂时只支持装饰class）
 * 完整功能的实现，请见core-decorators的源代码
 */
import _ from 'lodash'

const bind = target => {
  return class extends target{
    constructor(...p) {
      super(...p)
      for (const key of Object.getOwnPropertyNames(target.prototype)) {
        if ( !_.isFunction(this[key]) ) {
          continue
        } 
        this[key] = this[key].bind(this)
      }
    }
  }
}

@bind
class A {
  name = 'haha'

  say(){
    console.log(`${this.name} hello`)
  }

  f = ()=>{ // 这样的方法不会到prototype里
    console.log('aaa')
  }
}

const b = new A()
const {say} = b
say()
