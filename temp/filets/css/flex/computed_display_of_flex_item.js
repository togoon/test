/*
 * flex item的computed style，都是block
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      display : 'flex',
    }} >
      {/*
      在chrome调试器里可以看到下面两个span的computed style都是block
      */}
      <span>A</span>
      <span>B</span>
      C
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

