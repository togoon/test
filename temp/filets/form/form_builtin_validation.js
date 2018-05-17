// React 
import React, { PureComponent } from 'react'
import {render} from 'react-dom'
import injectSheet from 'react-jss'

@injectSheet({
  cnumber : {
    '&:invalid' : { // 类似的伪类还有 :valid, :in-range, :out-of-range
      border : '1px solid red',
    },
  },
})
class Test extends PureComponent {

  /*
   * 现代的form都不会用传统的方式提交，因此一定要在onSubmit里preventDefault
   */
  onSubmit = e=>{
    // ... 这里写自己的处理逻辑
    console.log('on submit')
    e.preventDefault()
  }

  render() {
    const {onSubmit} = this
    const {classes:{cnumber}} = this.props

    return <form onSubmit={onSubmit}>
      <input className={cnumber} type="number" step="1" min="12" max="120" name="age" required ref={el=>this.number=el}/>
      {/* pattern是不能用于textarea的，那其他的校验能用于textarea吗？研究一下 */}
      <textarea pattern='aaa' className={cnumber} />
      {/* 缺省只要是form里的button，点击都会触发submit动作 */}
      <button>默认按钮</button>
    </form>
  }
}

render(<Test />
  , document.getElementById('root'))

