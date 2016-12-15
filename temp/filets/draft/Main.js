import React, { Component } from 'react';
import Radium from 'radium';
import {border as bd} from './utils/cssobj.js'

const S = {
  main: {
    ...bd,
  },
}

class Main extends Component {
  render() {
    return <div>主面板</div>
  }
}

export default Radium(Main);

