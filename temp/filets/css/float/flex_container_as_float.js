/*
 * flex容器是可以指定为float的，好像mdn的表述有误
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      width : 100,
      border : '2px solid red',
      float : 'left',
    }} >
      <div style={{
        border : '2px solid green',
        width : 50,
        height : 50,
        display : 'flex',
        float : 'right',
      }} >
        <div>A</div>
        <div>B</div>
        <div>C</div>
      </div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

