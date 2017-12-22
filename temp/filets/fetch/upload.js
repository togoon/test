// React
/*
 * 演示用fetch来按表单的形式上传文件
 */
import React, {PureComponent} from 'react'
import { render } from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div>
      <input type="file" accept="image/gif, image/jpeg, image/png, image/svg" ref={el=>this.file=el} onChange={e=>{
        console.log('files', e.target.files[0])
      }} />
    <button onClick={e=>{
      console.log('files', this.file.files)
      var data = new FormData()
      data.append('file', this.file.files[0])

      fetch('http://localhost:8083/upload', {
        method: "POST",
        body: data
      })
    }}>点我</button>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

