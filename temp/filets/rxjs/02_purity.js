// React
/*
 * rx更便于把事件管理纯化
 * 示例：点击时统计点击的次数
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  button = el=>{
    Rx.Observable.fromEvent(el, 'click')
      .scan(count => count + 1, 0) // 有点类似array的reduce，用来统计点击次数
      .subscribe(count => console.log(`Clicked ${count} times`))
  }

  render() {
    return <div>
      <button ref={this.button}>点击一下</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

