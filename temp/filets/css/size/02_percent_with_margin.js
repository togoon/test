/*
 * 演示一下100%尺寸在有margin时的情况
 * 结论：
 * > 自己的margin不会减少活动空间
 * > 自动尺寸的容器，水平撑不开，竖直撑得开
 */
import React from 'react';
import S from 'styled-components'
import ReactDOM from 'react-dom';

const Outer = (S.div`
    border : 10px solid blue;
    padding : 10px;
    margin : 50px;
    background : lightblue;
    width : 110px;
    height : 110px;
`)

const Auto = (S.div`
    margin : 10px;
    border : 10px solid red;
    padding : 10px;
    background : pink;
`)

const Width100Pct = (S.div`
    width : 100%
    height : 50px;
    border : 10px solid green;
    background : lightgreen;
    margin : 10px;
`)
const Width50Pct = (S.div`
    width : 50%
    height : 50px;
    border : 10px solid green;
    background : lightgreen;
    margin : 10px;
`)

/*
 * 对于autoi size的容器, height 100%无效
 */
const Height100Pct = Width100Pct.extend`
    height : 100%;
`

class Test extends React.Component {
  render() {
    return <div>
      <div>width : 100%</div>
      <Outer>
        <Auto>
          <Width100Pct />
        </Auto>
      </Outer>
      <div>width : 50%</div>
      <Outer>
        <Auto>
          <Width50Pct />
        </Auto>
      </Outer>
      <div>height : 100%无效</div>
      <Outer>
        <Auto>
          <Height100Pct />
        </Auto>
      </Outer>
      <Outer>
        <Auto>
          <Height100Pct>
            a
          </Height100Pct>
        </Auto>
      </Outer>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
