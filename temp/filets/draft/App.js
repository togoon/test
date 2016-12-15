import React, { Component } from 'react'
import Radium from 'radium'

import {HotKeys} from 'react-hotkeys'

import {border as bd, flex, ptr, bg} from './utils/cssobj.js'
import ToolPanel from './ToolPanel.js'
import Main from './Main.js'

const S = {
  main: {
    ...bd, ...flex,
    width: 1024,
    height: 500,
    ':hover' : {
      backgroundColor: "red",
    },
  },
}

console.log("fuck:", S.main);

class App extends Component {

  state = {
    brush: null, // 选中的画刷
  }

  // 选中一个画刷
  onBrush(id) {
    this.setState({ brush:id })
  }

  // 取消画刷
  offBrush() {
    this.setState({ brush:null })
  }

  render() {
    let s = this.state
    
    return <HotKeys style={S.main} handlers={
       {'esc' : this.offBrush.bind(this)}
    } >
      <ToolPanel onPick={this.onBrush.bind(this)}/>
      <Main brush={s.brush}/>
    </HotKeys>
  }
}

export default Radium(App);

