/*
 * 正常情况下，float元素不会试图把其容器宽度撑大
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      width : 100,
      border : '1px solid red',
      // display : 'flex',
      // flexDirection : 'column',
      // alignItems : 'flex-start',
    }} >
      <div style={{
        border : '1px solid gray',
        boxSizing : 'border-box',
      }} >
        <div style={{
          width : 80,
          height : 80,
          border : '1px solid green',
          float : 'left',
        }} >
          A
        </div>
        <div style={{
          width : 80,
          height : 80,
          border : '1px solid lightblue',
          float : 'right',
        }} >
          B
        </div>
          b b
        <div>
          a a a 
        </div>
      </div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

