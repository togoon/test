/*
 * 如果在一个flex item里，情况有点微妙
 * > 不出现parent collapse现象
 * > float元素和散装的inline会参与试图撑开宽度
 */
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      width : 300,
      display : 'flex',
      border : '1px solid red',
    }} >
      <div style={{
        border : '1px solid gray',
        boxSizing : 'border-box',
        flex : 1,
      }} >
        <div style={{
          width : 80,
          height : 80,
          border : '1px solid green',
          float : 'left',
        }} >
          A
        </div>
        <div style={{
          width : 80,
          height : 80,
          border : '1px solid lightblue',
          float : 'right',
        }} >
          B
        </div>
          b b
        <div>
          a a
        </div>
      </div>
      <div style={{flex:1, 
        backgroundColor : 'aqua',
      }}  />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

