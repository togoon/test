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

class Main extends Component {

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
    return <svg className={cx(S.main, {
      [S.todraw] : this.hasBrush()
    })} 
      onClick={this.onClick.bind(this)}
    >
      <Mysql x={ 100 } y={ 100 } onClick={this.test}/>
      <Mysql x={300} y={200} />
      <Storage x={300} y={40} />
    </svg>
  }
}

Main.propTypes = {
  brush: PropTypes.number,
}

export default Main;
/*
      <g transform={`translate(100 100)`} onClick={this.test.bind(this)} >
        <rect width="100" height="100" fill="yellow" />
        <text x="50" y="50" dx="-35" fontFamily="微软雅黑" fontSize="24" dominantBaseline="central">
          Mysql
        </text>
      </g>
      
  */

