import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`;

class Test extends React.Component {
  render() {
    return <Button>
      点击我
    </Button>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
