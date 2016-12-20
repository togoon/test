/* eslint-disable react/jsx-pascal-case */

import React, { Component } from 'react'

import {HotKeys} from 'react-hotkeys'
import { connect } from 'react-redux'

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

class App extends Component {

  render() {
    const p = this.props

    return <HotKeys className={S.main} handlers={{
      esc : p.offBrush,
      del : () => {console.log("heihei")}, 
    }} 
    >
      <ToolPanel_ />
      <Main_ />
    </HotKeys>
  }
}

const { func, } = React.PropTypes
App.propTypes = {
  offBrush : func, // 取消画刷
}

const dm = (d) => {
  return {
    offBrush : ()=>{
      d({ type: 'brush_clear'})
    },
  }
}

export default connect(null, dm)(App)

