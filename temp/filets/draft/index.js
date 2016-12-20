/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { render } from 'react-dom'
import { createStore, 
  // combineReducers,
} from 'redux'
import { Provider } from 'react-redux'
import {Map as IMap} from 'immutable'
import uuid from 'uuid/v1' 

import App_ from './App.js'

// 用immutable来表示整个状态
let s0 = IMap({
  brush : null,

  kits : IMap({ // 图元数据, immutable
    m1 : {
      type : 'mysql',
      x : 150,
      y : 100,
    },
    m2 : {
      type : 'mysql',
      x : 300,
      y : 100,
    },
    s1 : {
      type : 'storage',
      x : 100,
      y : 240,
    },
    s2 : {
      type : 'storage',
      x : 400,
      y : 240,
    },
  }),

  links : {
    l1 : {
      from : 's1',
      // from_port: // 如果缺省，则为唯一的"out"
      to : 'm1',
      to_port: 'volumn',
    },
    l2 : {
      from : 's2',
      to : 'm2',
      to_port: 'volumn',
    },
  },

  mode : 'normal', // 当前的操作状态，可选值 grab, draw

  grabbed_kit: null, // 当前抓住的图元，为其id

})

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

const reducer_table = {
  new_item, grab, move_to, brush_set,
  brush_clear : reset,
  release : reset, 
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

