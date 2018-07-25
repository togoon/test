/*
 * 演示一下100%尺寸在有margin时的情况
 * 结论：
 * > 自己的margin不占活动空间
 * > 自动尺寸的容器，水平方向容器不会被撑大，竖直方向则被会撑大
 */
import React from 'react';
import S from 'styled-components'
import ReactDOM from 'react-dom';

const Outer = (S.div`
    border : 10px solid blue;
    padding : 10px;
    background : lightblue;
    width : 100px;
    height : 100px;
`)

const Middle = (S.div`
    border : 10px solid red;
    padding : 10px;
    background : pink;
`)

const Inner = (S.div`
    width : 100%
    height : 50px;
    border : 10px solid green;
    background : lightgreen;
    margin : 10px;
`)

class Test extends React.Component {
  render() {
    return <Outer>
      <Middle>
        <Inner />
      </Middle>
    </Outer>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
