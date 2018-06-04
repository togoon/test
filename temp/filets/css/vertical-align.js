// React 
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

class Test extends PureComponent {
  render() {
    return <div style={{backgroundColor : '#eee',}} >
      <span style={{
        backgroundColor : 'green',
        fontSize : 10,
        verticalAlign : 'text-top',
      }} >A</span>
      <span style={{
        backgroundColor : 'blue',
        fontSize : 20,
      }} >A</span>
      <span style={{
        backgroundColor : 'gray',
        fontSize : 30,
      }} >A</span>
      <img src='/a.png' />
    </div>
  }
}

render(<Test /> , document.getElementById('root'))

