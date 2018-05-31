/*
 * flex容器是可以指定为float的，好像mdn的表述有误
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

    return <div style={{
      width : 200,
      border : '2px solid red',
    }} >
    {float}
    <div>a</div>
    {float}a{float}a
    <div>a</div>
  </div>
  }
}

render(<Test /> , document.getElementById('root'))

