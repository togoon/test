/*
 * min-width等属性对span是无效的
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

  /*
      a a a a a 
      a a a a a 
      a a a a a 
      a a a a a 
      */
class Test extends PureComponent {
  render() {
    return <div style={{
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
      a
     </span>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

