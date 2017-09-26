// React
/*
 * rxjs的最基础的例子. 为了方便测试，与react结合使用
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  button = el=>{
    /*
     * 演示如何使用rx来绑定一个点击事件
     * 事实上，对于点击事件的简单监听，还体现不出rx的优势
     */
    Rx.Observable.fromEvent(el, 'click')
      .subscribe(() => console.log('Clicked!'))
  }

  render() {
    return <div>
      <button ref={this.button}>点击一下</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

