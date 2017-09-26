// React
/*
 * 演示如何实现双击
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  double_click = el=>{
    let click = Rx.Observable.fromEvent(el, 'click')
    click.buffer(click.debounceTime(250))
      .map(list => list.length)
      .filter(x => x === 2) // 只支持正好两次的连击，多了和少了都不会触发
      .subscribe(() => {
        console.log('doubleclick');
      })
  }

  render() {
    return <div>
      <button ref={this.double_click}>双击</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

