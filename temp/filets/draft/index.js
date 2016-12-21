/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { render } from 'react-dom'
import { createStore, 
  // combineReducers,
} from 'redux'
import { Provider } from 'react-redux'
import {Map as IMap} from 'immutable'
import uuid from 'uuid/v1' 
import _ from 'lodash'

import App_ from './App.js'

// 用immutable来表示整个状态
let s0 = IMap({
  brush : null,

  kits : IMap({ // 图元数据, immutable
    a : {
      type : 'bp_A',
      x : 296,
      y : 363,
    },
    b : {
      type : 'bp_B',
      x : 196,
      y : 197,
    },
    c : {
      type : 'bp_C',
      x : 298,
      y : 33,
    },
    my : {
      type : 'My',
      x : 394,
      y : 194,
    },
  }),

  links : { // 这里又没有使用immutable，纯粹只是尝试
    l1 : {
      from : 'a',
      from_port: 'o1',
      to : 'b',
      to_port: 'x1',
    },

    l2 : {
      from : 'a',
      from_port: 'o2',
      to : 'my',
      to_port: 'x2',
    },

    l3 : {
      from : 'b',
      from_port: 'o2',
      to : 'c',
      to_port: 'x1',
    },

    l4 : {
      from : 'my',
      from_port: 'o1',
      to : 'c',
      to_port: 'x2',
    },

  },

  mode : 'normal', // 当前的操作状态，可选值 grab, draw

  grabbed_kit: null, // 当前抓住的图元id, 用于拖动

  selected: null, // 当前选中的id，用于删除等操作

  selected_type: null, // 表示当前选中是kit还是link

})

function new_link(s, a) {
  let links = s.get('links')
  // eslint-disable-next-line
  const {type, ...link} = a

  links = {...links, [uuid()]:link}
  s = s.set('links', links)
  return s
}

function new_item(s, a) {

  const kit = {
    type :  s.get('brush'),
    x : a.x,
    y : a.y,
  }

  const kits = s.get('kits').set(uuid(), kit)
  s = s.set('kits', kits)

  return reset(s)
}

function grab(s, a) {
  s = s.set('mode', 'grab')
  s = s.set('grabbed_kit', a.kid)
  return s
}

function move_to(s, a) {
  const kid = s.get('grabbed_kit')
  let kits = s.get('kits')
  const kit = kits.get(kid)
  kits = kits.set(kid, {...kit, x: a.x, y : a.y})
  s = s.set('kits', kits)
  return s
}

function reset(s) {
  s = s.set('brush', null)
  s = s.set('mode', 'normal')
  return s.set('grabbed_kit', null)
}

function brush_set(s, a) {
  s = s.set('brush', a.val)
  s = s.set('mode', 'draw')
  return s
}

function pick_kit(s, a) {
  s = s.set('selected_type', 'kit')
  s = s.set('selected', a.id)
  return s
}

function pick_link(s, a) {
  s = s.set('selected_type', 'link')
  s = s.set('selected', a.id)
  return s
}

function del(s) { // 删除元素
  const type = s.get('selected_type')
  const id = s.get('selected')
  let links = s.get('links')
  if ( type === 'link' ) { // 删除link
    links = _.omit(links, id)
    s = s.set('links', links)
  } else if ( type === 'kit' ) {
    // 删除跟它相关的边
    links = _.pickBy(links, (v) => {
      if ( v.from === id || v.to === id ) {
        return false
      } 
      return true
    })
    s = s.set('links', links)

    // 删除图元
    let kits = s.get('kits')
    kits = kits.delete(id)
    s = s.set('kits', kits)
  }
    
  return s
}

// ------------ reducer ----------------
const reducer_table = {
  new_item, grab, move_to, brush_set,
  brush_clear : reset,
  release : reset, 
  pick_kit, pick_link, del, new_link,
}

function reducer(s = s0, a) {
  const f = reducer_table[a.type]
  if ( !f ) {
    return s
  }
  return f(s, a)
}

const store = createStore(reducer)

render(<Provider store={store} >
    <App_ />
  </Provider>, 
  document.getElementById('root'))

