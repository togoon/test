/*
 * 演示bfc对margin collapse的影响
 * bfc的parent不与其孩子进行margin collapsing
 */
import React from 'react'
import S from 'styled-components'
import { render } from 'react-dom'

const Child = (S.div`
    background : green;
    width : 100px;
    height : 100px;
    margin : 20px;
    color : white;
`)
const NoneBFC = (S.div`
    background : lightblue;
`)
const BFC = (S.div`
    display: flow-root;
    background : lightblue;
`)

class Test extends React.PureComponent {
  render() {
    return <div>
      <NoneBFC>
        <Child>普通容器</Child>
      </NoneBFC>
      <BFC>
        <Child>BFC容器</Child>
      </BFC>
    </div>
  }
}

render(<Test />, document.getElementById('root'))
