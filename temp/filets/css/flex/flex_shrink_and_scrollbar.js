/*
 * flex容器溢出的时候，什么时候会flex-shrink，什么时候会滚动条？
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{
      display : 'flex',
      flexDirection : 'column',
      overflow : 'auto',
      height : 300,
      width : 300,
    }} >
      <div style={{
        /*
         * 这里是否指定display:flex很关键。
         * 如果注释掉flex，则容器不会shrink到压缩子元素。这时就会容器出现滚动条
         */
        // display : 'flex',
        flexDirection : 'inherit',
      }} >
        <div style={{
          height : 200,
          backgroundColor : 'lightblue',
        }} >
          A
        </div>
      </div>
      <div>
        <div style={{
          height : 200,
          backgroundColor : 'darkseagreen',
        }} >
          B
        </div>
      </div>
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

