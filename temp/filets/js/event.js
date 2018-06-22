// React 
import React, { PureComponent} from 'react'
import _ from 'lodash'
import {render} from 'react-dom'

class Test extends PureComponent {
  componentDidMount(){
    const {p, c} = this.refs
    // p.onclick = e=>{
    //   console.log('p')
    // }
    p.addEventListener('click', e=>{
      e.preventDefault()
      e.stopPropagation()
      console.log('p')
    }, true)

    // c.onclick = e=>{
    //   // e.stopPropagation()
    //   console.log('c')
    // }
    c.addEventListener('click', e=>{
      e.stopPropagation()
      e.preventDefault()
      console.log('c')
      // return false
    })
  }

  render() {
    return <div style={{
      width : 200,
      height : 200,
      backgroundColor : '#ccc',
    }} ref='p' >
      <a style={{
        display : 'block',
        width : 100,
        height : 100,
        backgroundColor : 'antiquewhite',
      }} ref='c' href='/' >
        a
      </a>
    </div>
  }
}

render(<Test /> , document.getElementById('root')) 
