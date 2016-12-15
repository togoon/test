import React, { Component } from 'react';
import Radium from 'radium';

import {border as bd, flex} from './utils/cssobj.js'
import ToolPanel from './ToolPanel.js'
import Main from './Main.js'

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
      <Main />
    </div>
  }
}

export default Radium(App);

