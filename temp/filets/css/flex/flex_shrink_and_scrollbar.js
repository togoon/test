/*
 * flex容器溢出的时候，什么时候会flex-shrink，什么时候会滚动条？
 * flex-shrink的缺省值是1，表面上似乎意味着其可以被无限压缩，但实际上不会压缩到挤压子元素的程度，这种情况下就会溢出或者出现滚动条
 * 但如果该元素本身又是一个flex容器，则意味着它具备了挤压子元素的能力。而其子元素又能否被挤压，则递归地应用这条规则来判定
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
         * 如果注释掉flex，则容器不会shrink到压缩子元素。这时容器就会出现滚动条
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

