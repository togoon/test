// React 
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

/*
 * 记：跳到谁的页面，就pop谁的state
 */
window.addEventListener('popstate', e=>{
  console.log('popstate', e.state)
})

class Test extends PureComponent {
  render() {
    /*
     * 通过pushState来实现页面不用刷新的跳转, 需要程序员自行维护url里的信息与页面的一致性
     * push的是新页面的state
     */
    return <div>
    <button onClick={e=>{
      window.history.pushState('shit!', '', 'newPage')
    }}>pushState</button>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

