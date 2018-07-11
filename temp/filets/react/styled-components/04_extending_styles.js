/*
 * 演示styled-components用在自定义组件的场景
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Btn0 = p => <button {...p}>按钮</button>

const Btn1 = styled(Btn0)`
  background-color : red;
`

const Btn2 = Btn1.extend`
  line-height : 30px;
`

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
