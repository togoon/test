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
      x : 197,
      y : 357,
    },
    b : {
      type : 'bp_B',
      x : 162,
      y : 181,
    },
    c : {
      type : 'bp_C',
      x : 377,
      y : 64,
    },
    my : {
      type : 'My',
      x : 475,
      y : 208,
    },
  }),

  // 大蓝图的输入输出设定
  io : {
    in : [
      {name : 'o1'}, 
      {name : 'o2'}, 
    ],
    out : [
      { name : 'x1', },
      { name : 'x2', },
      { name : 'x3', },
    ], 
  },

  links : { // 这里并没有使用immutable，纯粹只是尝试

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
      to_port: 'x1',
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

    l5 : {
      from : '_in_',
      from_port: 'x1',
      to : 'a',
      to_port: 'x1',
    },

    l6 : {
      from : '_in_',
      from_port: 'x2',
      to : 'my',
      to_port: 'x2',
    },

    l7 : {
      from : '_in_',
      from_port: 'x3',
      to : 'b',
      to_port: 'x2',
    },

    l8 : {
      from : 'b',
      from_port: 'o1',
      to : '_out_',
      to_port: 'o1',
    },

    l9 : {
      from : 'c',
      from_port: 'o1',
      to : '_out_',
      to_port: 'o2',
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

function _check_partial(seq, rules) { // 判断一个序列是否符合偏序规则
    // rules的格式为 [ [a, b], ... ]
  return _.every(rules, (rule, i ) => {
    const [ a, b ] = rule
    const ia = seq.indexOf(a)
    if ( ia === -1 ) {
      return false
    } 
    const ib = seq.indexOf(b)
    if ( ib === -1 ) {
      return false
    } 

    // console.log("ia", ia, 'ib', ib)
    if ( ia >= ib ) {
      return false
    } 
    return true
  })

}

// console.log('fuck', _check_partial( [ 'a', 'b', 'c', 'd', 'e' ], [ ['a', 'b'], ['b', 'e'] ] ))

function _partial_order_add(seq, a, b, rules) {
  // 设计一个算法，但尚未证明该算法一定可行，先试用

  const seq1 = _.without(seq, a, b)

  // 构造一个 seq len + 2 的二重循环
  const l = seq1.length + 2

  for( let i = 0; i < l-1; i++ ){
    for( let j = i+1; j<l; j++ ){
      const before = seq1.slice(0, i)
      const middle = seq1.slice(i, j-1)
      const after = seq1.slice(j-1, l)
      // 拼成一个新的序列
      const new_seq = [...before, a, ...middle, b, ...after]

      // 如果符合规则，则立即返回
      if ( _check_partial(new_seq, rules) ) {
        return new_seq
      } 
    }
  }
  return null
}

console.log('partial add', _partial_order_add(["b", "my", "c", "a"], 'a', 'my', [['my','c'], ['b','c'],  ] ))

function _make_kit_order(links) { // 根据links来计算出各个组件的依赖关系
  let order = []

  _.each(links, (item, i ) => {
    
  })
}

function make_bp(s) { // 生成蓝图
  const el = document.getElementById('bp_edit')

  // 输入输出可直接得到
  const io = s.get('io')

  // 先定义好蓝图之间的顺序关系

  const bp = { 
    version : 20161209, 
    input: io.in,
    output : io.out, 
    body : {
      
    }
  }
  el.innerText = JSON.stringify(bp, null, '  ')

  return s
}

// ------------ reducer ----------------
const reducer_table = {
  new_item, grab, move_to, brush_set,
  brush_clear : reset,
  release : reset, 
  pick_kit, pick_link, del, new_link, make_bp,
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

