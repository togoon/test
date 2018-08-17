/*
 * getBoundingClientRect不包括margin
 */
import React from 'react'
import { render } from 'react-dom'

class Test extends React.PureComponent {
  render() {
    return <div style={{
      margin : 50,
      width : 100,
      height : 100,
      background : 'gray',
    }} ref={el=>console.log(el.getBoundingClientRect())}></div>
  }
}

render(<Test />, document.getElementById('root'))
