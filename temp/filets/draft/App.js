import React, { Component } from 'react'

import {HotKeys} from 'react-hotkeys'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import {css, border as bd, flex, } from './utils/cssobj.js'
import ToolPanel from './ToolPanel.js'
import Main from './Main.js'

const S = css({
  main: {
    ...bd, ...flex,
    width: 1024,
    height: 500,
  },
})

let store = createStore(() => {})

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
    console.log("esc");
    this.setState({ brush:null })
  }

  render() {
    let s = this.state
    return <Provider store={store} >
        <HotKeys className={S.main} handlers={
        {'esc' : this.offBrush.bind(this)}
      } >
        <ToolPanel onPick={this.onBrush.bind(this)} sel={s.brush} />
        <Main brush={s.brush}/>
      </HotKeys>
    </Provider>
  }
}

export default App;

