/*
 * 演示styled-components用在自定义组件的场景
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Button = p => <button {...p}>按钮</button>

const NewButton = styled(Button)`
  background-color : red;
`

class Test extends React.Component {
  render() {
    return <div>
      <NewButton />
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
