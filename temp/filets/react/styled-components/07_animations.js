/*
 * 演示styled components对keyframes的支持
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;


class Test extends React.Component {
  render() {
    return <div>
      <Rotate>你好</Rotate>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
