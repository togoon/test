/*
 * 对于content-box的box-sizing，padding是不参与元素大小的约束
 * 而对于border-box，padding如果过大将会把元素撑开（无视原本尺寸约束）
 * 这时content的尺寸是0 * 0，会根据wrap的机制来显示元素
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test2 extends PureComponent {
  render() {
    return <div>
      <div style={{
        width : 100,
        height : 100,
        padding : 80, // padding很大，将无视原来的width, height设置
        border : '1px solid gray',
        boxSizing : 'border-box',
      }} >
        a b c d
      </div>
    </div>
  }
}

render(<Test2 /> , document.getElementById('root'))

