/*
 * margin collapsing 与 clear float的相互影响
 * 当clear float与前面的float元素接触时，margin collapse以float的元素为准（不管谁大谁小）
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

    const block = (<div style={{
      width : 200,
      margin : 20,
      border : '2px solid green',
      clear : 'left',
    }} >
      a a a a 
    </div>)
    return <div>
      {float}
      {block}
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

