// React 
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

/*
 * 当使用浏览器的前进、后退浏览到pushState对应的页面时，popstate事件会触发
 * 注：浏览器的前进、后退按钮等价于history的back, forward, go方法的调用
 */
window.addEventListener('popstate', e=>{
  console.log('popstate', e.state)
})

class Test extends PureComponent {
  render() {
    /*
     * 通过pushState来实现页面不用刷新的跳转
     * 这种情况下需要程序员自行维护url里的信息与页面的一致性
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

