import React, { Component } from 'react';
import { render } from 'react-dom'
import Radium from 'radium';

import ToolPanel from './ToolPanel.js'
import {border as bd} from './cssobj.js'

const S = {
  main: {
    ...bd,
    display: "flex",
    width: 200,
    height: 200,
  },

  test: {
    height: 300,
  }
}

class Main extends Component {
  render() {
    return <div style={[S.main, S.test]}>
      <ToolPanel/>
    </div>
  }
}

let App = Radium(Main)

render(<App />, document.getElementById('root'))

