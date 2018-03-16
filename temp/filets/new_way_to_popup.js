// React 
import React, { PureComponent,} from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

class Test extends PureComponent {
  state = {
    value : 'aaa'
  }

  popup = ()=>{
    const {value} = this.state 
    const el = this.refs.a
    render( <div> 
      <button onClick={()=>{
        unmountComponentAtNode(el)
      }}>关闭</button>
    <input defaultValue={value} onChange={e=>this.setState({ value:e.target.value })}/>
    </div>, el)
  }

  render() {
    const {value} = this.state 
    return <div>
      <div>
        {value}
      </div>
      <button onClick={this.popup}>点我</button>
      <div ref='a' />
    </div>
  }
}

render(<Test />
  , document.getElementById('root'))

