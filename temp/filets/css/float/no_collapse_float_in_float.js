/*
 * float in float则不会collapse
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      width : 100,
      border : '2px solid red',
      float : 'left',
    }} >
      <div style={{
        border : '2px solid green',
        width : 50,
        height : 50,
        float : 'left',
      }} >
      </div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

