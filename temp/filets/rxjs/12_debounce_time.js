// React
/*
 * 测试debounceTime的用法
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  /*
   * 特点
   * 1、一定会延时
   * 2、"电梯式"地等待，也就是如果鼠标不停地狂点，事件将一直不会触发
   */
  click = el=>{
    Rx.Observable.fromEvent(el, 'click')
      .debounceTime(300)
      .subscribe(() => {
        console.log('click');
      })
  }

  render() {
    return <div>
      <button ref={this.click}>点击</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

