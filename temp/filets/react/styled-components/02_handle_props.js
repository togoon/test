import React from 'react'
import ReactDOM from 'react-dom'
import styled, { css } from 'styled-components'

/*
 * 好像不用css也可以，那这个css有什么用呢
 */
const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`;

class Test extends React.Component {
  render() {
    return <div>
      <Button>主按钮</Button>
      <Button primary>primary按钮</Button>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
