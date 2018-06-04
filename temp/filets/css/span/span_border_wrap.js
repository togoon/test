/*
 * span有边框，又折行的情况
 *
 * span上下边框之所以不被容器包括的原因是：css希望对于一个折行的span，调整边框宽度不会影响行距
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

  /*
      */
class Test extends PureComponent {
  render() {
    return <div style={{
      // display : 'flex',
      // alignItems : 'center',
      
      width: 100,
      backgroundColor : '#ddd',
    }} >
    <span style={{
      border : '2px solid gray',
      // backgroundColor : 'pink',
      boxSizing : 'border-box',
      fontSize : 20,
    }} >
      a a a a a 
      a a a a a 
      a a a a a 
      a a a a a 
     </span>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

