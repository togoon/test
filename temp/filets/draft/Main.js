import React, { Component, PropTypes} from 'react'
import Radium from 'radium'

import _ from 'lodash'
import cx from 'classnames'

import {css, border as bd, hsl, bg, flex, } from './utils/cssobj.js'

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
      <g transform="translate(100 100)" onClick={this.test.bind(this)} >
        <rect width="100" height="100" fill="yellow" />
        <text x="50" y="50" dx="-25" fontFamily="微软雅黑" fontSize="28" dominantBaseline="central">
          测试
        </text>
      </g>
      <g><rect x="300" y="40" width="100" height="100" fill="burlywood" /></g>
    </svg>
  }
}

Main.propTypes = {
  brush: PropTypes.number,
}

export default Radium(Main);

