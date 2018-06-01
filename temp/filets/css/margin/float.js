/*
 * float的元素间不会发生margin collapsing
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    const float = (<div style={{
      width : 100,
      height : 100,
      border : '2px solid  lightblue',
      margin : 10,
      float : 'left',
    }} />)

    return <div>
      {float}
      {float}
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

