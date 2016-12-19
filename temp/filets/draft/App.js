import React, { Component } from 'react'

import {HotKeys} from 'react-hotkeys'
import { createStore, combineReducers} from 'redux'
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

// brush的reducer
function brush(s = null, a) {
  switch(a.type) {
    case 'brush_set':
      return a.val
    case 'brush_clear':
      console.log("clear!")
      return null
    default:
      return s
  }
}

const app = combineReducers({
  brush,
})


let store = createStore(app)

class App extends Component {

  state = {
    brush: null, // 选中的画刷
  }

  // 选中一个画刷
  onBrush(id) {
    store.dispatch({type: 'brush_set', val: id})

    this.setState({ brush:id })
  }

  // 取消画刷
  offBrush() {
    console.log("esc");
    store.dispatch({type: 'brush_clear'})

    this.setState({ brush:null })
  }

  render() {
    const ss = store.getState()
    console.log("ss", store.getState())

    let s = this.state
    return <Provider store={store} >
        <HotKeys className={S.main} handlers={
        {'esc' : this.offBrush.bind(this)}
      } >
        <ToolPanel onPick={this.onBrush.bind(this)} sel={s.brush} />
        <Main brush={ss.brush}/>
      </HotKeys>
    </Provider>
  }
}

export default App;

