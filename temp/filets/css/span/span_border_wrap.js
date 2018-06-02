/*
 * span有边框，又折行的情况
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
      // display : 'flex',
      // alignItems : 'center',
      
      width: 100,
      backgroundColor : '#ddd',
    }} >
    <span style={{
      border : '2px solid gray',
      backgroundColor : 'pink',
      boxSizing : 'border-box',
      fontSize : 20,
      verticalAlign : 'middle',
    }} >
      a
     </span>
    <span style={{
      border : '2px solid gray',
      backgroundColor : 'pink',
      boxSizing : 'border-box',
      fontSize : 10,
      verticalAlign : 'middle',
    }} >
      a
     </span>
     <img src='a.png' style={{
       // border : '10px solid gray',
       verticalAlign : 'middle',
     }} />
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

