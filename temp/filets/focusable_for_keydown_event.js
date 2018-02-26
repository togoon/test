// React 
/*
 * 演示如何令svg元素也能响应keydown事件。但目前只对chrome有效
 */
import React, { PureComponent,} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  setEvents = ()=>{
    const {ball} = this.refs
    ball.addEventListener('focus', ()=>{})
  }

  componentDidMount(){
    this.setEvents()
  }

  render() {
    return <svg style={{
      width : 300,
      height : 300,
      }} 
    >
      <circle cx={100} cy={100} r={50} fill='blue' ref='ball' 
        onFocus={()=>console.log('focus')}
        onKeyDown={()=>{
          console.log('key')
        }}
      />
    </svg>
  }
}

render(<Test />
  , document.getElementById('root'))

