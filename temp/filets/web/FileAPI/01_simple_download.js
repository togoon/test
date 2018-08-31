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
        const url = reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;filename=aa.txt;')
        console.log('reader.result', reader.result)
        console.log('url', url)
        window.open(url)
      }
    }}>点我</button>
  }
}

render(<Test />, document.getElementById('root'))
