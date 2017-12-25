// React 
/*
 * 用纯css实现的一个下拉菜单
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import {css} from './utils/cssobj.js'

css({
  '@global' :   {  
    ".menu": {
      "display": "block",
      "zIndex": "999999"
    },
    ".menu li": {
      "display": "inline-block",
      "position": "relative"
    },
    ".menu li.dropdown:hover > .submenu": {
      "display": "block"
    },
    ".menu li a": {
      "display": "block",
      "padding": "12px 8px",
      "background": "#ccc"
    },
    ".menu li.dropdown > a::after": {
      "fontStyle": "normal",
      "fontWeight": "400",
      "marginLeft": "8px",
      "fontSize": "10px"
    },
    ".menu li a::before": {
      "fontStyle": "normal",
      "fontWeight": "400",
      "marginRight": "8px"
    },
    ".menu li a:hover": {
      "background": "grey"
    },
    ".menu .submenu": {
      "display": "none"
    },
    ".submenu": {
      "margin": "0px",
      "padding": "0px",
      "position": "absolute",
      "left": "0px",
      "listStyleType": "none",
      "display": "block",
      "width": "200px",
      "zIndex": "9"
    },
    ".submenu li": {
      "display": "block"
    },
    ".submenu li a": {
      "display": "block",
      "background": "#999",
      "color": "#fff",
      "padding": "8px 6px",
      "marginBottom": "1px"
    },
    ".menu .submenu > li.dropdown:hover > .submenu": {
      "display": "block"
    },
    ".menu .submenu .submenu": {
      "position": "absolute",
      "left": "200px",
      "top": "0px"
    },
    ".submenu li.dropdown > a:after": {
      "fontStyle": "normal",
      "fontWeight": "400",
      "marginLeft": "8px",
      "fontSize": "10px"
    }
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

render(<Test />, document.getElementById('root'))

