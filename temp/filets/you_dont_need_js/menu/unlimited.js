// React 
/*
 * 用纯css实现的一个下拉菜单
 * 重点在于dropdown和submenu角色的区分!
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import {css} from './utils/cssobj.js'

css({
  '@global' :   {  

    ".menu > *, .submenu > *": {
      "position": "relative"
    },

    // 子菜单初始不显示
    ".menu .submenu":  {
      display : "none"
    },

    // 只有hover状态的子菜单才显示
    ".menu .dropdown:hover > .submenu": {
      display : "block"
    },

    // 子菜单的样式
    ".submenu": {
      "margin": "0px",
      "padding": "0px",
      "position": "absolute",
      "left": 0,
      "display": "block",
      "width": "200px",
      "zIndex": "9"
    },

    ".menu .submenu > .item.dropdown:hover > .submenu": {
      "display": "block"
    },
    ".menu .submenu .submenu": {
      "position": "absolute",
      "left": "200px",
      "top": "0px"
    },
  }
})

const Test = () => (
<ul className="menu">
  <li><a href="">主页</a></li>
  <li className="dropdown">
    <a href="">Service</a>
    <ul className="submenu">
      <li>
        <a href="">satu</a>
      </li>      
      <li className="dropdown">
        <a href="">dua</a>
        <ul className="submenu">
          <li className="dropdown">
            <a href="">jeruh dua</a>
            <ul className="submenu">
              <li>
                <a href="">mentok satu</a>
              </li>
              <li className="dropdown">
                <a href="">mentok dua</a>
                <ul className="submenu">
                  <li>
                    <a href="">njedok prend satu</a>
                  </li>      
                  <li>
                    <a href="">njedok prend dua</a>
                  </li>
                  <li>
                    <a href="">njedok prend tiga</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="">mentok satu</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="">jeruh satu</a>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li><a href="">Other</a></li>
</ul>
)

const Item = p=>{
  const div = {
    ...p,
    style : {
      "padding": "12px 8px",
      "background": "#ccc",
      ...p.style,
    }
  }

  return <div {...div}/>
}

const Test2 = () => (
  <div className="menu" style={{
    display : 'flex',
  }} >
    <Item>主页</Item>
    <div className='dropdown'>
      <Item>这是啥</Item>
      <div className="submenu">
        <div className='dropdown'>
          <Item>子菜单1</Item>
          <div className='submenu'>
            <Item>其他</Item>
          </div>
        </div>
        <Item>1111</Item>
      </div>
    </div>
    <Item>哈哈</Item>
  </div>
)

render(<Test2 />, document.getElementById('root'))

