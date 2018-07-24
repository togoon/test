/*
 * 演示一下100%尺寸到底是多少
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
    background : lightred;
`)

const Inner = (S.div`
    width : 100%
    height : 50px;
    border : 10px solid green;
    background : lightgreen;
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
