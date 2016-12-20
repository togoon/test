/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'

import {HotKeys} from 'react-hotkeys'
import { createStore, combineReducers} from 'redux'
import { Provider, connect } from 'react-redux'

import {css, border as bd, flex, } from './utils/cssobj.js'
import ToolPanel_ from './ToolPanel.js'
import Main_ from './Main.js' 

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

class C extends Component {

  render() {
    const p = this.props

    return <HotKeys className={S.main} handlers={{
      'esc' : p.offBrush
    }} 
    >
      <ToolPanel_ />
      <Main_ />
    </HotKeys>
  }
}

const { func, } = React.PropTypes
C.propTypes = {
  offBrush : func, // 取消画刷
}

const dm = (d) => {
  return {
    offBrush : ()=>{
      d({ type: 'brush_clear'})
    },
  }
}

const C_ = connect(null, dm)(C)

class App extends Component {
  render() {
    return <Provider store={store} >
      <C_ />
    </Provider>
  }
}

export default App;

