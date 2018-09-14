/*
 * 演示bfc会包裹里面的float元素，不产生height collapsing
 */
import React from 'react'
import S from 'styled-components'
import { render } from 'react-dom'

const Title = (S.div`
    padding : 30px;
`)
const Float = (S.div`
    float : left;
    background-color : lightblue;
`)

const NoneBFC = (S.div`
    background-color : antiquewhite;
    border : 1px solid gray;
`)

const BFC = (NoneBFC.extend`
    display : flow-root;
`)

class Test extends React.PureComponent {
  render() {
    return <div>
      <Title>普通容器</Title>
      <NoneBFC>
        <Float>浮动到左边的文本</Float>
      </NoneBFC>
      <Title>BFC容器</Title>
      <BFC>
        <Float>浮动到左边的文本</Float>
      </BFC>
    </div>
  }
}

render(<Test />, document.getElementById('root'))
