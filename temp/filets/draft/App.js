/* eslint-disable react/jsx-pascal-case */

import React, { PureComponent } from 'react'

import {HotKeys} from 'react-hotkeys'
import { connect } from 'react-redux'

import {css, border as bd, flex, w,} from './utils/cssobj.js'
import ToolPanel_ from './ToolPanel.js'
import Main_ from './Main.js' 
import Property_ from './Property.js'

const S = css({
  main: {
    ...bd, ...flex,
    width: 1600,
    height: 500,
  },
})

class App extends PureComponent {

  render() {
    const p = this.props

    return <HotKeys className={S.main} handlers={{
      esc : p.brush_clear,
      del : p.del,
    }} 
    >
      <div style={{...flex, ...w('100%')}} >
        <ToolPanel_ />
        <Main_ />
        <Property_ />
        <div id="bp_edit" contentEditable={true} style={{
          width: 450,
          whiteSpace: 'pre-wrap',
          overflow: "auto",
        }} />
      </div>
    </HotKeys>
  }
}

const dm = (d) => {
  return {
    brush_clear(){
      d({ type: 'brush_clear'})
    },

    del(){
      d({ type: 'del', })
    },
  }
}

export default connect(null, dm)(App)

