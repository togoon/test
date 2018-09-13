/*
 * bfc不影响与兄弟的margin collapsing
 */
import React from 'react'
import S from 'styled-components'
import { render } from 'react-dom'

const NoneBFC = (S.div`
    background : lightblue;
    height : 100px;
    margin: 20px;
`)
const BFC = (NoneBFC.extend`
    display: flow-root;
`)

class Test extends React.PureComponent {
  render() {
    return <div>
      <NoneBFC>
        普通容器
      </NoneBFC>
      <BFC>
        BFC容器
      </BFC>
    </div>
  }
}

render(<Test />, document.getElementById('root'))
