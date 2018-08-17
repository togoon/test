/*
 * react鼠标坐标的计算方法
 */
import React from 'react'
import { render } from 'react-dom'

class Test extends React.PureComponent {
  render() {
    return <div style={{
      marginTop : 1000,
      width : 100,
      height : 100,
      background : 'gray',
    }} onClick={e=>{
      console.log('e.clientY', e.clientY)
      console.log('e.screenY', e.screenY)
      console.log('e.pageY', e.pageY)
      /*
       * 截至2018年8月17日，react还不支持以下事件
       */
      console.log('e.offsetY', e.offsetY)
      console.log('e.movementY', e.movementY)
    }} >
    </div>
  }
}

render(<Test />, document.getElementById('root'))

