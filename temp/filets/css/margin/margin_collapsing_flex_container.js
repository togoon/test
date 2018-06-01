/*
 * flex container的行为跟普通无异
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    const div = (<div style={{
      width : 100,
      height : 100,
      display : 'flex',
      border : '2px solid  lightblue',
      margin : 10,
    }} />)

    return <div>
      {div}
      {div}
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

