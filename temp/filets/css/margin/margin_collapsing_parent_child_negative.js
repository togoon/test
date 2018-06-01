/*
 * parent和child之间的margin collapse
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    const child = (<div style={{
      width : 100,
      height : 100,
      border : '2px solid lightblue',
      margin : -20,
    }} />)

    return <div style={{
      // display : 'flex',
      // justifyContent : 'center', 
      // alignItems : 'center',
      width : 500,
      height : 500,
      // transform : 'translate(100px, 100px)',
    }} >
      <div style={{
      margin : 10,
    }} >
      {child}
    </div>
    <div style={{
      width : 100,
      height : 100,
      border : '2px solid lightblue',
      margin : 10,
    }} >
    </div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

