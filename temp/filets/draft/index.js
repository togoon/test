import React, { Component } from 'react';
import { render } from 'react-dom'
import Radium from 'radium';

import ToolPanel from './ToolPanel.js'

const S = {
  main: {
    display: "flex",
    backgroundColor: "red",
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

