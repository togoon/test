// React
/*
 * 演示如何处理stop propagation
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  button = el=>{
    let click = Rx.Observable.fromEvent(el, 'click').map(e=>{
      e.stopPropagation()
      return e
    })
    click.subscribe(e => { console.log('inner click') })
  }

  div = el=>{
    let click = Rx.Observable.fromEvent(el, 'click')
    click.subscribe(e => { console.log('outer click') })
  }

  render() {
    return <div style={{ width : 200, height : 200, backgroundColor : 'cyan' }} ref={this.div}>
      <button ref={this.button}>点击</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

