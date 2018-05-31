/*
 * padding不会向任何尺寸约束妥协，即使在flex容器的挤压中
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test2 extends PureComponent {
  render() {
    return <div style={{
      display : 'flex',
      flexDirection : 'column',
      border : '1px solid cyan',
      height : 200,
      width : 100,
    }} >
      <div style={{
        height : 100,
        padding : 80, 
        border : '1px solid blue',
        boxSizing : 'border-box',
      }} >
        A
      </div>
      <div style={{
        flex : 1,
        padding : 80, 
        border : '1px solid yellow',
        boxSizing : 'border-box',
      }} >
        B
      </div>
    </div>
  }
}

render(<Test2 /> , document.getElementById('root'))

