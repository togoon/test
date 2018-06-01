/*
 * parent collapsing
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    const float = (<div style={{
      border : '2px solid green',
      width : 50,
      height : 50,
      float : 'left',
      backgroundColor : 'lightblue',
    }} />
    )

    return <div>
      <div style={{
        width : 200,
        border : '2px solid red',
      }} >
        {float}
        <div>a</div>
      </div>
      <div>b</div>
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

