// React 
/*
 * overflowX和overflowY单独设值的一个坑
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div>
      <div style={{
        width : 300,
        height : 300,
        backgroundColor : 'lightblue',
        border : '1px solid gray',

        overflowX : 'hidden', // 如果这里设置了hidden的话，
        overflowY : 'visible', // 这里的visible将不生效，在chrome上试验，这仍然是auto的效果。调试工具上也是显示为auto的值
      }} >
        <div style={{
          width : 500,
          height : 500,
          backgroundColor : 'cyan',
        }} />
      </div>
      <div>
        这是什么
      </div>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

