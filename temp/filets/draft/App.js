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

  state = {
    brush: null, // 选中的画刷
  }

  // 选中一个画刷
  onBrush(id) {
    this.setState({ brush:id })
  }

  render() {
    let s = this.state
    
    return <div style={S.main}>
      <ToolPanel onPick={this.onBrush.bind(this)}/>
      <Main brush={s.brush}/>
    </div>
  }
}

export default Radium(App);

