/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { render } from 'react-dom'
import { createStore, 
  // combineReducers,
} from 'redux'
import { Provider } from 'react-redux'
import {Map as IMap} from 'immutable'

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

function reducer(s = s0, a) {
  switch(a.type) {

    case 'brush_set':
      return s.set('brush', a.val)

    case 'brush_clear':
      console.log("clear!")
      return s.set('brush', null)


    default:
      return s
  }
}

let store = createStore(reducer)

render(<Provider store={store} >
    <App_ />
  </Provider>, 
  document.getElementById('root'))

