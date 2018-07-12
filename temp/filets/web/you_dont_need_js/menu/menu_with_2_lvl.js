// React 
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'

import injectSheet from 'react-jss'
import {H} from './utils/components/Flex.js'
import './utils/css_preset.js'

const item = {
  cursor : 'pointer',
  position : 'relative',
  padding : '2px 10px',
}

@injectSheet({
  main : {
    borderBottom : '1px solid gray',
  },
  item1 : {
    ...item,
    borderRight : '1px solid gray',
    '&:hover' : {
      backgroundColor : '#d4d4d4',
    },
  },

  submenu : {
    display : 'none',
    position : "absolute",
    left : 0,
    transform : 'translateY(3px)',
    minWidth : 150,
    border : '1px solid gray',
    borderTop : 'none',
  },

  dropdown : {
    ...item,
    borderRight : '1px solid gray',
    '&:hover $submenu' : {
      display : "block",
    },
  },

  item2 : {
    ...item,
    padding : '2px 10px',
    backgroundColor : '#d8d8d8',
    '&:hover' : {
      backgroundColor : '#bbbbbb',
    },
  }
})
export default class Test extends PureComponent {
  render() {
    const {classes:{main, item1, dropdown, item2, submenu}} = this.props
    return <H className={main}>
      <div className={item1}>
        主页
      </div>
      <div className={dropdown}>
        网络技术
        <div className={submenu}>
          <div className={item2}>
            哈哈
          </div>
          <div className={item2}>
            嘿嘿
          </div>
        </div>
      </div>
      <div className={dropdown}>
        这是坑爹
        <div className={submenu}>
          <div className={item2}>
            哇哇
          </div>
          <div className={item2}>
            嘿嘿
          </div>
          <div className={item2}>
            这是一条很长的菜单
          </div>
        </div>
      </div>
      <div className={item1}>
        业务场景
      </div>
      <div className={item1}>
        管理培训
      </div>
    </H>
  }
}

render(<Test />, document.getElementById('root'))

