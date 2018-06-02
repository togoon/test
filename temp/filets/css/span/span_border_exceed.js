/*
 * min-width等属性对span是无效的
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      display : 'flex',
      width : 200,
      height : 200,
      alignItems : 'center',
      justifyContent : 'center',
    }} >
      <div style={{
      width: 100,
      backgroundColor : '#ddd',
    }} >
    <span style={{
      border : '2px solid gray',
      backgroundColor : 'pink',
      boxSizing : 'border-box',
      fontSize : 20,
      minWidth : 100, 
    }} >
      span的border上下边界会超出容器（左右不会）
     </span>
    </div>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

