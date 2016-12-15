import React, { Component } from 'react';
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
  render() {
    return <div style={S.main}>主面板</div>
  }
}

export default Radium(Main);

