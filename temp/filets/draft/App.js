/* eslint-disable react/jsx-pascal-case */

import React, { PureComponent } from 'react'

import {HotKeys} from 'react-hotkeys'
import { connect } from 'react-redux'

import { border as bd, flex, w,} from './utils/cssobj.js'
import ToolPanel_ from './ToolPanel.js'
import Main_ from './Main.js' 
import Property_ from './Property.js'
import H from './utils/components/H.js'
// import V from './utils/components/V.js'
// import Div from './utils/components/Div.js'


const S ={
  main: {
    ...bd, ...flex,
    width: 1600,
    height: 500,
    flexDirection: 'column',
  },

  btn: {
    marginLeft: 10,
  },
}

class App extends PureComponent {

  render() {
    const p = this.props

    function Btn(p){
      return <button {...p} style={{...p.style, ...S.btn}}  />
    } 

    return <HotKeys style={S.main} handlers={{
      esc : p.brush_clear,
      del : p.del,
    }} 
    >
      <div style={{padding:'5px 0'}} >
        <Btn onClick={p.make_bp}>Make Blueprint</Btn>
        <Btn>Save</Btn>
        <Btn>Save As</Btn>
        <Btn>Switch to lvl0</Btn>
      </div>
      <H style={{...w('100%'), flex: 1}} >
        <ToolPanel_ />
        <Main_ />
        <Property_ />
        <div id="bp_edit" contentEditable={true} style={{
          width: 450,
          whiteSpace: 'pre-wrap',
          overflow: "auto",
        }} />
      </H>
    </HotKeys>
  }
}

const sm = (s) => {
  return {
    level : s.get('level'), 
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

    make_bp(){
      d({ type: 'make_bp', })
    },
  }
}

export default connect(sm, dm)(App)

