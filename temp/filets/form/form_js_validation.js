// React 
/*
 * 演示用js来控制控件的验证
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

class Test extends PureComponent {

  check = e=>{
    const input = this.number
    console.log(input.validity.valid, 
      input.checkValidity() // 其返回值与上者一样，但如果不符合校验，会触发一个onInvalid事件
      /*
       * 但如果不调用checkValidity方法，即使用户输入不合法，该事件不会被触发
       */
    )
    /*
     * 还有很多其他属性, 还有通过方法来判断 详见文档 <url:https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation>
     */
  }

  onInvalid = e=>{ // 被checkValidity()方法触发
    console.log('shit!')
  }

  render() {
    const {check, onInvalid} = this

    return <form>
      <input type="number" step="1" min="12" max="120" name="age" required ref={el=>this.number=el} onInvalid={onInvalid}/>
      {/* 如果浏览器默认的行为满足不了需求，可以使用javascript api来自定义逻辑 */}
      <input type='button' value='点我' onClick={check}/>
    </form>
  }
}

render(<Test />
  , document.getElementById('root'))

