/*
 * 演示一下100%尺寸在有flex时的情况
 * 结论：
 * > chrome和firefox的表现不一样
 * > firefox对于flex布局的处理是对称的，而chrome不是
 */
import React from 'react';
import S from 'styled-components'
import ReactDOM from 'react-dom';

const H = (S.div`
    border : 10px solid blue;
    padding : 10px;
    background : lightblue;
    width : 100px;
    height : 100px;
    margin : 50px;
    display : flex;
`)
const V = (H.extend`
    flex-direction:column;
`)
const Auto = (S.div`
    margin : 10px;
    border : 10px solid red;
    padding : 10px;
    background : pink;
`)

const Inner1 = (S.div`
    width : 100%
    height : 50px;
    border : 10px solid green;
    background : lightgreen;
    margin : 10px;
`)
const Inner2 = (S.div`
    height : 100%
    width : 50px;
    border : 10px solid green;
    background : lightgreen;
    margin : 10px;
`)

class Test extends React.Component {
  render() {
    return <div>
      <H>
        <Auto>
          <Inner1 />
        </Auto>
      </H>
      <div> 
        chrome对于下面的组件，竖直高度撑不开（bug）height:100%无效，具体的值才有效
        <br />
        而在firefox里，下图和上图是对称的（正确的展示） 
      </div>
      <V>
        <Auto>
          <Inner2 />
        </Auto>
      </V>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
