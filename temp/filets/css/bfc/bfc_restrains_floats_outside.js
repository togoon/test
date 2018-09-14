/*
 * 演示bfc如何不包裹外面的浮动元素
 */
import React from 'react'
import S from 'styled-components'
import { render } from 'react-dom'

const Sep = (S.div`
    padding : 30px;
`)
const Container = (S.div`
    width : 200px;
`)
const Float = (S.div`
    float : left;
    background-color : lightblue;
`)

const NoneBFC = (S.div`
    background-color : antiquewhite;
`)

const BFC = (NoneBFC.extend`
    display : flow-root;
`)

class Test extends React.PureComponent {
  render() {
    return <div>
      <Container>
        <Float>浮动到左边的文本</Float>
        <NoneBFC>
          普通容器里文本会围绕在浮动元素周围
          当文本太多的时候会折行
        </NoneBFC>
      </Container>
      <Sep />
      <Container>
        <Float>浮动到左边的文本</Float>
        <BFC>
          BFC里的文本不会围绕在浮动元素周围
        </BFC>
      </Container>
    </div>
  }
}

render(<Test />, document.getElementById('root'))
