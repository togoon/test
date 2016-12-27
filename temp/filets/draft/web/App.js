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
import _ from 'lodash'

import {
  switch_level_confirm, 
  cannot_save_empty,
  make_yaml_first,
} from './strings.js'


const S ={
  main: {
    ...bd, ...flex,
    width: 1200,
    height: 500,
    flexDirection: 'column',
  },

  btn: {
    marginLeft: 10,
  },
}

const api = { // 不作为框架的结构，仅仅提取一些公共的逻辑
  save_bp(body, d) {
    post('/save_bp', body)
      .then(res => {
        alert("save success!")
        d({
          type : 'set_bp_id', 
          bp_id : res.data.bp_id, 
        })
      })
  },
}

class App extends PureComponent {

  componentDidMount(){
    const p = this.props 

    if( location.host === 'localhost:3000' ) { // 纯前端测试用
      return
    }

    p.load_bp()
  }

  onTextChange(e) {
    const p = this.props 
    p.set_yaml(e.target.value)
  }

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
          <textarea style={{
            width: 300, ...bd,
            resize: "none",
          }} value={p.yaml} onChange={this.onTextChange.bind(this)} />
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
        <textarea style={{
          ...bd, flex: 1,
          resize: "none",
        }} value={p.yaml} onChange={this.onTextChange.bind(this)} />
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

function post(url, para) {

  const headers = {
    'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
    'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
  }

  return fetch(url, {
    method : 'POST', headers, body : form_encode(para),
  }).then(res => res.json())
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

    set_yaml(yaml){
      d({ type: 'set_yaml', yaml})
    },

    switch_level(){
      if ( confirm(switch_level_confirm) ) {
        d({ type: 'switch_level'})
      } 
    },

    save_bp1(){ // 保存lvl1的蓝图

      d((d, getState) => {

        // d({ type: 'make_bp' }) 先不生成
        const s = getState()
        const yaml = s.get('yaml')

        if ( _.trim(yaml) === '' ) {
          alert(make_yaml_first)
          return
        } 

        const bp = {
          kits : s.get('kits').toJS(),
          io: s.get('io'),
          links : s.get('links'), 
          vals: s.get('vals'),
        }

        const body = {
          id : s.get('bp_id') || 0,
          topo : JSON.stringify(bp, null, '  '),
          yaml,
          user: s.get('user_id')
        }

        api.save_bp(body, d)
      })
    },

    save_bp0(){
      d((d, getState) => {
        const s = getState()
        // 获取到yaml
        const yaml = s.get('yaml')

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

    load_bp(){
      d((d, getState) => {
        const id = window.para.c_id
        post('/get_blueprint', {bpr_id:id})
          .then(res => {

            const topo_str = res.data.topo
            let data = {
                bp_id : id,
            }

            if( topo_str ) {
              data = {
                ...data,
                level : 1,
                ...JSON.parse(topo_str)
              }
            } else { // lvl 0
              data = {
                ...data,
                level : 0,
                yaml : res.data.yaml, 
              }
            }
            d({ type: 'load', data})
          })
      })
    },
  }
}

export default connect(sm, dm)(App)

