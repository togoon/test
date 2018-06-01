/*
 * 演示margin为负的情况
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    const block = (<div style={{
      width : 100,
      height : 100,
      border : '2px solid lightblue',
      marginBottom : -20,
    }} />)

    const block1 = (<div style={{
      width : 100,
      height : 100,
      border : '2px solid green',
      marginTop : 20,
    }} />)

    return <div>
      {block}
      {block1}
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

