import React, { Component, PropTypes} from 'react';
import Radium from 'radium';
import {border as bd, hsl, bg, flex } from './utils/cssobj.js'

const S = {
  main: {
    ...bd,
    ...bg(hsl(178, 32, 75)),
    ...flex(1),
  },
}

class Main extends Component {
  onClick() {
    let p = this.props

    console.log("draw:" + p.brush);
  }
  
  render() {
    return <div style={S.main} onClick={this.onClick.bind(this)}>主面板</div>
  }
}

Main.propTypes = {
  brush: PropTypes.number,
}

export default Radium(Main);

