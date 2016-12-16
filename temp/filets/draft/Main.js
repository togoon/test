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
  
  render() {
    return <div className={cx(S.main, {
      [S.todraw] : this.hasBrush()
    })} 
      onClick={this.onClick.bind(this)}
    >
      主面板
    </div>
  }
}

Main.propTypes = {
  brush: PropTypes.number,
}

export default Radium(Main);

