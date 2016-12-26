/* eslint-disable react/jsx-pascal-case */

import React, { PureComponent } from 'react'

import {HotKeys} from 'react-hotkeys'
import { connect } from 'react-redux'

import form_encode from 'form-urlencoded'

import { border as bd, flex, w, h,} from './utils/cssobj.js'
import ToolPanel_ from './ToolPanel.js'
import Main_ from './Main.js' 
import Property_ from './Property.js'
import H from './utils/components/H.js'
import V from './utils/components/V.js'
import Div from './utils/components/Div.js'

import {
  switch_level_confirm, 
  cannot_save_empty,
} from './strings.js'


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

    let View

    const Name = 'User: ' + p.user + ( p.name ? ' Bp: ' + p.name : ' *Unnamed*' )

    if ( p.level === 1 ) {
      View = <V style={{...h('100%')}}>
        <div style={{padding:'5px 0'}} >
          {Name}
          <Btn onClick={p.make_bp}>Make Blueprint</Btn>
          <Btn onClick={p.save_bp1} >Save</Btn>
          <Btn>Save As</Btn>
          <Btn onClick={p.switch_level} >Switch to lvl0</Btn>
        </div>
        <H style={{...w('100%'), flex: 1}} >
          <ToolPanel_ />
          <Main_ />
          <Property_ />
          <div id="bp_edit" style={{
            width: 450, ...bd,
            whiteSpace: 'pre-wrap',
            overflow: "auto",
          }}>
            {p.yaml}
          </div>
        </H>
      </V>
    } else {
      View = <V style={{...h('100%')}} >
        <Div style={{padding:'5px 0'}} >
          {Name}
          <Btn onClick={p.save_bp0} >Save</Btn>
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
    name : s.get('bp_id'),
    yaml : s.get('yaml'),
    user : s.get('user_id'),
  }
}

const api = {
  save_bp(body, d) {
    fetch('/save_bp', { method: 'POST', 
      headers: {
        'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      body: form_encode(body),
    }).then(res => res.json())
      .then(res => {
        alert("save success!")
        d({
          type : 'set_bp_id', 
          bp_id : res.data.bp_id, 
        })
      })
  },
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
      if ( confirm(switch_level_confirm) ) {
        d({ type: 'switch_level'})
      } 
    },

    save_bp1(){ // 保存lvl1的蓝图

      d((d, getState) => {

        d({ type: 'make_bp' })

        const s = getState()

        const bp = {
          kits : s.get('kits').toJS(),
          io: s.get('io'),
          links : s.get('links'), 
          vals: s.get('vals'),
        }

        const body = {
          id : s.get('bp_id') || 0,
          topo : JSON.stringify(bp, null, '  '),
          yaml : s.get('yaml'),
          user: s.get('user_id')
        }

        api.save_bp(body, d)
      })
    },

    save_bp0(){
      d((d, getState) => {
        const s = getState()
        // 获取到yaml
        const edit = document.getElementById('bp_edit')
        const yaml = edit.innerText

        if ( yaml === '' ) {
          alert(cannot_save_empty)
          return
        } 

        const body = {
          id : s.get('bp_id') || 0,
          yaml,
          user: s.get('user_id')
        }

        api.save_bp(body, d)
      })
    },
  }
}

export default connect(sm, dm)(App)

