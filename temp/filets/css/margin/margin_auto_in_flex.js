// React 
import React from 'react';
import _ from 'lodash'
import S from 'styled-components'
import ReactDOM from 'react-dom';
import Frame from 'react-frame-component'
import './utils/css_preset.js'
import {css} from './utils/cssobj.js'

const A = (S.div`
    display: flex;
    flex-direction : column;
`)

const B1 = (S.div`
    background-color: gray;
`)

const B2 = (S.div`
    margin: auto;
    background-color: gray;
`)

const C = (S.div`
    width: 100px;
    height: 10px;
`)

const Hr = (S.hr`
    margin : 50px;
`)

class Test extends React.Component {
  render() {
    return <div>
      <div>默认stretch的情况</div>
      <A>
        <B1>
          <C />
        </B1>
      </A>
      <Hr />
      <div>margin:auto可以阻止元素被flex stretch的行为. 在这种情况下，类似于align-self:center的效果</div>
      <A>
        <B2>
          <C />
        </B2>
      </A>
    </div>
  }
}

ReactDOM.render(
  <Test />,
  document.getElementById('root')
);
