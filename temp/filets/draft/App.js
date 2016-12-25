/* eslint-disable react/jsx-pascal-case */

import React, { PureComponent } from 'react'

import {HotKeys} from 'react-hotkeys'
import { connect } from 'react-redux'

import { border as bd, flex, w, h,} from './utils/cssobj.js'
import ToolPanel_ from './ToolPanel.js'
import Main_ from './Main.js' 
import Property_ from './Property.js'
import H from './utils/components/H.js'
import V from './utils/components/V.js'
import Div from './utils/components/Div.js'


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
  onClick() {

    fetch('/save_bp', {
      method: 'POST',
    }).then((res) => {
      if ( res.ok ) {
        res.text().then((text) => {
          console.log(text)
        })
      } 
    })
  }

  render() {
    const p = this.props

    function Btn(p){
      return <button {...p} style={{...p.style, ...S.btn}}  />
    } 

    let View

    if ( p.level === 1 ) {
      View = <V style={{...h('100%')}}>
        <div style={{padding:'5px 0'}} >
          <Btn onClick={p.make_bp}>Make Blueprint</Btn>
          <Btn onClick={this.onClick} >Save</Btn>
          <Btn>Save As</Btn>
          <Btn onClick={p.switch_level} >Switch to lvl0</Btn>
        </div>
        <H style={{...w('100%'), flex: 1}} >
          <ToolPanel_ />
          <Main_ />
          <Property_ />
          <div id="bp_edit" contentEditable={true} style={{
            width: 450, ...bd,
            whiteSpace: 'pre-wrap',
            overflow: "auto",
          }} />
        </H>
      </V>
    } else {
      View = <V style={{...h('100%')}} >
        <Div style={{padding:'5px 0'}} >
          <Btn>Save</Btn>
          <Btn>Save As</Btn>
          <Btn onClick={p.switch_level} >Switch to lvl1</Btn>
        </Div>
        <div>Input the YAML text of the Blueprint</div>
        <div id="bp_edit" contentEditable={true} style={{
          ...bd, flex: 1,
          whiteSpace: 'pre-wrap',
          overflow: "auto",
        }} />
      </V>
    } 

    return <HotKeys style={S.main} handlers={{
      esc : p.brush_clear,
      del : p.del,
    }} 
    >
      {View}
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

    switch_level(){
      d({ type: 'switch_level'})
    },
  }
}

export default connect(sm, dm)(App)

