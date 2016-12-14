import React, { Component } from 'react';
import Radium from 'radium';

import {border as bd, flex} from './utils/cssobj.js'
import ToolPanel from './ToolPanel.js'

const S = {
  main: {
    ...bd, ...flex,
    width: 1024,
    height: 500,
  },
}

class App extends Component {
  render() {
    return <div style={S.main}>
      <ToolPanel/>
    </div>
  }
}

export default Radium(App);

