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

  mode : 'normal', // 当前的操作状态，可选值 'grab'

  grabbed_kit: null, // 当前抓住的图元，为其id

})

function newItem(s, x, y) {

  const kit = {
    type :  s.get('brush'),
    x, y,
  }

  const kits = s.get('kits').set(uuid(), kit)
  s = s.set('kits', kits)

  return release(s)
}

function grab(s, kid) {
  s = s.set('mode', 'grab')
  s = s.set('grabbed_kit', kid)
  return s
}

function moveTo(s, x, y) {
  const kid = s.get('grabbed_kit')
  let kits = s.get('kits')
  const kit = kits.get(kid)
  kits = kits.set(kid, {...kit, x, y})
  s = s.set('kits', kits)
  return s
}

function release(s) {
  s = s.set('brush', null)
  s = s.set('mode', 'normal')
  return s.set('grabbed_kit', null)
}

function reducer(s = s0, a) {
  switch(a.type) {

    case 'brush_set':
      return s.set('brush', a.val)

    case 'brush_clear':
      console.log("clear!")
      return release(s)

    case 'new_item' :
      console.log("new item!")
      return newItem(s, a.x, a.y)

    case 'grab' :
      console.log("grab!")
      return grab(s, a.kid)

    case 'move_to' :
      console.log("move to!")
      return moveTo(s, a.x, a.y)

    case 'release' :
      console.log("release!")
      return release(s)

    default:
      return s
  }
}

let store = createStore(reducer)

render(<Provider store={store} >
    <App_ />
  </Provider>, 
  document.getElementById('root'))

