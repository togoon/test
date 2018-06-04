/*
 * 绝对定位的元素不参与flex布局
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      display : 'flex',
    }} >
    <div style={{
      border : '2px solid gray',
      backgroundColor : 'cornsilk',
    }} >a</div>
    <div style={{
      border : '2px solid gray',
      backgroundColor : 'cornsilk',
      position : 'absolute',
    }} >a</div>
    <div style={{
      border : '2px solid gray',
      backgroundColor : 'cornsilk',
      position : 'absolute',
    }} >a</div>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

