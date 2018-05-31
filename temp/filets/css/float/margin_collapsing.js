import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      // width : 200,
      // height : 200,
      // border : '2px solid red',
      // margin : 10,
      // border : '1px solid red',
      // float : 'left',
    }} >
    <div style={{
      width : 100,
      height : 100,
      border : '2px solid  lightblue',
      margin : 10,
      float : 'left',
    }} />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

