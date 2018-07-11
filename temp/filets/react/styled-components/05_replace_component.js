/*
 * 演示替换component的功能
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Btn0 = p => <button {...p}>按钮</button>

const Btn1 = styled(Btn0)`
  background-color : red;
`

// 这里可以替换component
const Btn2 = Btn1.withComponent('input')

class Test extends React.Component {
  render() {
    return <div>
      <Btn2 />
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
