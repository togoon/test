import React, { Component, PropTypes} from 'react'

import _ from 'lodash'
import cx from 'classnames'

import {css, border as bd, hsl, bg, flex, } from './utils/cssobj.js'
import Mysql from './widgets/Mysql.js'
import Storage from './widgets/Storage.js'

const S = css({
  main: {
    ...bd,
    ...bg(hsl(178, 32, 75)),
    ...flex(1),
  },

  todraw: {
    cursor: "crosshair",
  },
})

// 图元的映射
const widgetMap = {
  mysql : Mysql,
  storage : Storage,
}

class Main extends Component {

  state = {
    data : [ // 图元数据
      {
        type : 'mysql',
        x : 100,
        y : 100,
      },
      {
        type : 'mysql',
        x : 300,
        y : 200,
      },
      {
        type : 'storage',
        x : 400,
        y : 40,
      },
    ],
  }

  hasBrush() {
    let p = this.props
    return !_.isNull(p.brush) 
  }

  onClick() {
    let p = this.props

    if ( this.hasBrush() ) {
      console.log("draw:" + p.brush)
    }
  }

  test() {
    console.log("haha")
  }
  
  render() {
    let s = this.state

    let Items = s.data.map((item, i) => {
      let Cls =  widgetMap[item.type]
      return <Cls key={i} x={item.x} y={item.y} />
    })

    return <svg className={cx(S.main, {
      [S.todraw] : this.hasBrush()
    })} 
      onClick={this.onClick.bind(this)}
    >
      {Items}
    </svg>
  }
}

Main.propTypes = {
  brush: PropTypes.number,
}

export default Main;
/*
      <Mysql x={ 100 } y={ 100 } onClick={this.test}/>
      <Mysql x={300} y={200} />
      <Storage x={300} y={40} />
 */
