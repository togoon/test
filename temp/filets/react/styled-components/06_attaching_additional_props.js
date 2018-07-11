/*
 * styled components还实现了 add props hoc的util
 */
import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const Password = styled.input.attrs({
  type : 'password'
})``

class Test extends React.Component {
  render() {
    return <div>
      <Password />
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
