// React 
/*
 * 用纯css实现的一个下拉菜单
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import {css} from './utils/cssobj.js'

css({
  '@global' :   {  

    ".menu .item": {
      "display": "inline-block",
      "position": "relative"
    },

    // 子菜单初始不显示
    ".menu .submenu":  {
      display : "none"
    },

    // 只有hover状态的子菜单才显示
    ".menu .item.dropdown:hover > .submenu": {
      display : "block"
    },

    // 指定一下菜单项的样式
    ".menu .item a": {
      "display": "block",
      "padding": "12px 8px",
      "background": "#ccc"
    },

    ".menu .item.dropdown > a::after": {
      "fontStyle": "normal",
      "fontWeight": "400",
      "marginLeft": "8px",
      "fontSize": "10px"
    },

    ".menu .item a::before": {
      "fontStyle": "normal",
      "fontWeight": "400",
      "marginRight": "8px"
    },
    ".menu .item a:hover": {
      "background": "grey"
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

    ".submenu .item": {
      "display": "block"
    },
    ".submenu .item a": {
      "display": "block",
      "background": "#999",
      "color": "#fff",
      "padding": "8px 6px",
      "marginBottom": "1px"
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

const Test2 = () => (
  <div className="menu">
    <div className='item'>
      <a> 主页 </a>
    </div>
    <div className='item dropdown'>
      <a>这是啥</a>
      <div className="submenu">
        <div className='item dropdown'>
          <a> 子菜单1 </a>
          <div className='submenu'>
            <div className='item'> <a> 其他 </a> </div>
          </div>
        </div>
      </div>
    </div>
    <div className='item'> <a> 其他 </a> </div>
  </div>
)

render(<Test2 />, document.getElementById('root'))

