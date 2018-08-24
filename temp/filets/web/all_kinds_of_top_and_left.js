/*
 * dom元素的各种top, left
 */
import React from 'react'
import { render } from 'react-dom'

class Test extends React.PureComponent {
  render() {
    return <div style={{
      padding : 50,
      border : '1px solid black',
      position : 'relative',
    }} >
      <div style={{
        margin : 50,
        width : 100,
        height : 100,
        background : '#ccc',
        border : '10px solid #aaa',
      }} ref={el=>{
        console.log('el.offsetTop', el.offsetTop)
        console.log('el.clientTop', el.clientTop)
      }}></div>
    </div>
  }
}

render(<Test />, document.getElementById('root'))
