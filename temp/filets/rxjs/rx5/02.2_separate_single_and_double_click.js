// React
/*
 * 演示如何将单击和双击完全分离
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  rxButton = el=>{
    let click$ = Rx.Observable.fromEvent(el, 'click')

    click$ = click$.buffer(click$.debounceTime(250)).map(list => list.length)

    click$.filter(x => x === 2) // 只支持正好两次的连击，多了和少了都不会触发
      .subscribe(() => { console.log('rx doubleclick'); })

    click$.filter(x=>x === 1).subscribe(()=>console.log('rx click!'))
  }

  render() {
    return <div>
      {/* 使用正常的React事件体系，一次双击就会引发两次单击效果，这在一些情况下是很不方便处理的 */}
      <button onClick={e=>console.log('react click!')} onDoubleClick={e=>console.log('react double click!')} >
        使用正常的React事件
      </button>
      {/* 使用rxjs则可以将单击和双击完全区别对待 */}
      <button ref={this.rxButton}>使用rxjs</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

