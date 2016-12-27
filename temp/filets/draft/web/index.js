/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { render } from 'react-dom'
import { createStore, 
  // combineReducers,
  applyMiddleware,
} from 'redux'
import { Provider } from 'react-redux'
import {Map as IMap} from 'immutable'
import uuid from 'uuid/v1' 
import _ from 'lodash'
import qs from 'query-string'
// import yaml from 'yamljs'
import yaml from 'js-yaml'
import thunk from 'redux-thunk'

import App_ from './App.js'
import models from './kit_type.js'

// ------------------------------------------------
// 注入输入参数
window.para = qs.parse(location.search)

function check_partial(seq, rules) { // 判断一个序列是否符合偏序规则
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

function partial_order_add(seq, a, b, rules) {
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
      if ( check_partial(new_seq, rules) ) {
        return new_seq
      } 
    }
  }
  return null
}

function make_kit_order(links) { // 根据links来得出一个kit的顺序，以符合links的依赖关系
  let order = []
  const rules = []

  _.each(links, (link, i ) => {
    const a = link.from
    const b = link.to

    // 先添加到order
    order = partial_order_add(order, a, b, rules)
    if ( _.isNull(order) ) {
      console.error('make order error')
    }

    // 再添加到rules
    rules.push([a, b])
  })

  order = _.without(order, '_in_', '_out_')
  return order
}

function make_bp_body_and_output(order, kits, links, models) {
  const body = []
  const body_map = {} // 定义一个map用来赋值

  const outputs = []

  // 先根据order构建数据骨架
  _.each(order, (kid, i ) => {
    const kit = kits.get(kid) // 原始js数据
    const ykit = { // yaml对象
      extern: kit.type,
      name: kid,
      input : {...models[kit.type].in}, 
    }
    body_map[kid] = ykit
    body.push(ykit)
  })

  // 根据links填充剩下数据
  _.each(links, (link, i ) => {
    // 填对应input的值
    if ( link.from === '_in_' ){ // 输入关联
      body_map[link.to].input[link.to_port] = `<% .${link.from_port} %>`
    }
    else if ( link.to === '_out_'  ) { // 输出
      const output = {
        name : link.to_port, 
        from : {
          bp : link.from, 
          name : link.from_port, 
        }
      }
      outputs.push(output)
    } 
    else {
      body_map[link.to].input[link.to_port] = `<% .${link.from}.${link.from_port} %>`
    }

  })

  return [body, outputs]
}

// 用immutable来表示整个状态
const s0_1 = IMap({

  user_id: 'guanghui',

  level: 1,

  bp_id: null, // id也就是bp的名字

  yaml: '', 

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

  vals : { // 一些手动填的输入的值
    c : {
      x2 : 'ccc', 
    },
    my : {
      x1 : 123, 
    },
  },

  mode : 'normal', // 当前的操作状态，可选值 grab, draw

  grabbed_kit: null, // 当前抓住的图元id, 用于拖动

  selected: null, // 当前选中的id，用于删除等操作

  selected_type: null, // 表示当前选中是kit还是link

})

const s0_0 = IMap({
  level: 0,

  user_id: 'guanghui',

  bp_id: null,

  // yaml: '', 

})

// ----------------------------- reducers ---------------------------------
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
  s = s.set('selected', null)
  s = s.set('selected_type', null)
  return s.set('grabbed_kit', null)
}

function release(s) {
  s = s.set('mode', 'normal')
  return s
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

  s = reset(s)
    
  return s
}

function make_bp(s) { // 生成蓝图
  // lvl0 无此操作
  const lvl = s.get('level')
  if ( lvl === 0 ) {
    return s
  } 

  // 输入输出可直接得到
  const io = s.get('io')

  // 先定义好蓝图之间的顺序关系
  const order = make_kit_order(s.get('links'))
  const kits = s.get('kits')
  const links = s.get('links')
  const [body, output] = make_bp_body_and_output(order, kits, links, models)

  // console.log("body", body)

  const bp = { 
    version : 20161209, 
    input : io.out, 
    output,
    body,
  }

  // let text = JSON.stringify(bp, null, '  ')
  // let text = yaml.dump(bp)
  // const el = document.getElementById('bp_edit')
  // el.innerText = text
  s = s.set('yaml', yaml.dump(bp))

  return s
}

function switch_level(s) { // 切换蓝图，在lvl0和lvl1之间
  const lvl = s.get('level')
  if ( lvl === 1 ) {
    return s0_0
  } else {
    return s0_1
  }
}

function set_bp_id(s, a) { // 在蓝图被保存后更新其id
  s = s.set('bp_id', a.bp_id)
  return s
}

// ------------ reducer ----------------
const reducer_table = {
  new_item, grab, move_to, brush_set,
  brush_clear : reset,
  release, 
  pick_kit, pick_link, del, new_link, make_bp, switch_level, set_bp_id,
}

function reducer(s = s0_1, a) {
  const f = reducer_table[a.type]
  if ( !f ) {
    return s
  }
  return f(s, a)
}

// --------------- 中间件 -------------------
const logger = store => next => action => {
  console.groupCollapsed(action.type) // 跟上面例子相比，增加了日志分组，用于折叠
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
)(createStore)

const store = createStoreWithMiddleware(reducer)

render(<Provider store={store} >
    <App_ />
  </Provider>, 
  document.getElementById('root'))

