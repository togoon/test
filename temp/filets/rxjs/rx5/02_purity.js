// React
/*
 * rx更便于把事件管理纯化
 * 增加一些简单的事件管理，详见下文注释
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  /*
   * 统计点击次数
   */
  button = el=>{
    Rx.Observable.fromEvent(el, 'click')
      .scan(count => count + 1, 0) // 有点类似array的reduce，用来统计点击次数
      .subscribe(count => console.log(`Clicked ${count} times`))
  }

  /*
   * 点击限流
   */
  throttle = el=>{
    Rx.Observable.fromEvent(el, 'click')
      .throttleTime(1000)
      .scan(count => count + 1, 0)
      .subscribe(count => console.log(`限流点击 ${count} 次`));
  }

  /*
   * map的一个小示例: 每点击一次累加一下clientX
   * 没有实际的意义，仅为了演示map的用法
   */
  map = el=>{
    Rx.Observable.fromEvent(el, 'click')
      .throttleTime(1000)
      .map(event => event.clientX) 
      .scan((count, clientX) => count + clientX, 0)
      .subscribe(count => console.log(count));
  }

  render() {
    return <div>
      <button ref={this.button}>点击一下</button>
      <button ref={this.throttle}>限流</button>
      <button ref={this.map}>map</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

