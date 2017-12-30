// React
/*
 * 演示用createObjectURL来上传图片
 */
import React, {PureComponent} from 'react'
import { render } from 'react-dom'

class Test extends PureComponent {
  state = {
    img : null,
  }

  render() {
    const {img} = this.state 
    return <div>
      <input type="file" accept="image/gif, image/jpeg, image/png, image/svg" ref={el=>this.file=el} onChange={e=>{
        const file = e.target.files[0]
        this.setState({ img :  window.URL.createObjectURL(file)})
      }} />
    <img src={img} alt=''/>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

