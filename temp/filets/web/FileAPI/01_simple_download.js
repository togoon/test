/*
 * 未完成！！
 */
import React from 'react'
import { render } from 'react-dom'

class Test extends React.PureComponent {
  render() {
    return <button onClick={()=>{
      const reader = new FileReader()
      reader.readAsDataURL(new Blob(['hello'], {type: "text/plain;charset=utf-8"}))
      reader.onload = ()=>{
        console.log('reader.result', reader.result)
        window.open(reader.result)
      }
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
