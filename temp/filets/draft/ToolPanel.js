import React, { Component } from 'react';
import Radium from 'radium';
import { border, ptr } from './utils/cssobj.js'

const S = {
  main: {
    ...border,
    width: 150,
  },

  item: {
    ...border, ...ptr,
    height: 30,
  }
}

class ToolPanel extends Component {

  state = {
    data : [
    "按钮1",
    "按钮2",
    ]
  }

  render() {
    let s = this.state
    return <div style={S.main}>
      {s.data.map( (v,k) => 
        <div key={k} style={S.item}>{v}</div> 
      )}
    </div>
  }
}

export default Radium(ToolPanel);

