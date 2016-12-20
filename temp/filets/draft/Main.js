import React, { PureComponent } from 'react'

import _ from 'lodash'
import cx from 'classnames'
import { connect } from 'react-redux'

import {css, border as bd, hsl, bg, flex, } from './utils/cssobj.js'
import Mysql from './widgets/Mysql.js'
import Storage from './widgets/Storage.js'
import models from './kit_type.js'

const S = css({
  main: {
    ...bd,
    ...bg(hsl(178, 32, 75)),
    ...flex(1),
  },

  todraw: {
    cursor: "crosshair",
  },

  grab : {
    cursor : 'grab',
  },

  grabbing : {
    cursor : 'grabbing',
  },

})

// 图元的映射
const widgetMap = {
  mysql : Mysql,
  storage : Storage,
}

// 图元的宽度，后续考虑弄到某个配置里去
const KIT_WIDTH = 100
const KIT_HEIGHT = 100
const SLOT_HEIGHT = 10
const SLOT_WIDTH = 10

// 用于生成一排slot的位置
function posGen(x, y, n, type) {
  // TODO: 后面可以考虑让其分担更多render里的细节
  // type: 0 in, 1 out

  const step = 20
  let i = 0
  // 起始相对位置
  const x0 = (KIT_WIDTH - (step * (n-1))) / 2
  const y0 = type ? -SLOT_HEIGHT : KIT_HEIGHT-SLOT_HEIGHT

  // 起始绝对位置
  const rx = x + x0
  const ry = y + y0

  return () => {
    return {
      x : rx + (step * i++),
      y : ry,
    }
  }
}

// slot坐标的修正
function slot_top_left_to_center({x, y}) {
  return {
    x : x + (SLOT_WIDTH / 2),
    y : y + (SLOT_HEIGHT / 2),
  }
}

class Main extends PureComponent {

  constructor(p) {
    super(p)
  
    this.newItem = this.newItem.bind(this)
  }

  // 用于在拖动时正确计算图元的坐标
  drag_delta = {
    dx : null,
    dy : null,
  }

  // 点下一个新的图元
  newItem(e) {
    const p = this.props

    if ( p.mode !== 'draw' ) {
      return
    }

    const {top, left} = this.refs.svg.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    p.newItem(x, y)
  }

  release() {
    const p = this.props 
    if( p.mode === 'draw' )
      return

    p.release()
  }

  grab(kid, e) {
    const p = this.props
    const kit = p.kits.get(kid)
    
    this.drag_delta = {
      dx : kit.x - e.clientX,
      dy : kit.y - e.clientY,
    }

    p.grab(kid)
  }

  ifdrag(e) {
    const p = this.props
    
    // 只有grab状态才进行拖动
    if ( p.mode !== 'grab' ) {
      return
    }

    // 更新坐标
    const x = e.clientX + this.drag_delta.dx
    const y = e.clientY + this.drag_delta.dy

    p.moveTo(x, y)

  }

  render() {
    const p = this.props

    let Items = []
    p.kits.forEach((item, id) => {
      const Kit =  widgetMap[item.type] // 取到组件类
      Items.push(<Kit key={id} x={item.x} y={item.y} className={S.grab} onMouseDown={this.grab.bind(this, id)} />)
    })

    // 插口组
    let slot_coords = {
      // 形如：
      // m1 : {
      //  in : {
      //    xx {
      //      x : 100,
      //      y : 20,
      //    }
      //  }
      // }
    } // 插口坐标缓存

    let Slots = []
    p.kits.forEach((item, id ) => {

      let model = models[item.type] // 取到逻辑model

      let gp = {
        stroke : 'black',
        strokeWidth : 0.5,
      }

      // 输入插口
      let Ins = (()=>{

        const gen = posGen(item.x, item.y, _.size(model.in), 0)

        slot_coords[id] = slot_coords[id] || {}
        let xys = slot_coords[id].in = {}

        return _.map(model.in, ( type, key) => {

          let rid = `slot_${id}_${key}`

          const xy = gen() // 取到当前插口坐标

          xys[key] = xy // 缓存

          return <g key={rid} {...gp}>
            <rect id={rid} width={10} height={10} fill='chocolate' {...xy} />
            <text {...xy} visibility="hidden">
              {key}
              <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
            </text>
          </g>
        })
      })()

      // 输出插口
      let Outs = (()=>{

        slot_coords[id] = slot_coords[id] || {}
        let xys = slot_coords[id].out = {}

        let outs = model.out

        if ( !_.isObject(outs) ) {
          outs = { out : outs }
        }

        const gen = posGen(item.x, item.y, _.size(outs), 1)

        return _.map(outs, ( type, key) => {
          let rid = `slot_${id}_${key}`
          const xy = gen()

          xys[key] = xy // 缓存

          return <g key={rid} {...gp}>
            <rect id={rid} width={10} height={10} fill='cornsilk' {...xy} />
            <text {...xy} visibility="hidden">
              {key}
              <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
            </text>
          </g>
        })

      })()

      Slots =  [...Slots, ...Ins, ...Outs]

    })

    let Links = _.map(p.links, (item, i ) => {
      const from = slot_top_left_to_center(slot_coords[item.from].out[item.from_port || 'out'])
      const to = slot_top_left_to_center(slot_coords[item.to].in[item.to_port])
      
      let l =  {
        x1 : from.x,
        y1 : from.y,
        x2 : to.x,
        y2 : to.y,
        key : i,
      }

      return <line {...l} stroke="black" />
    })

    return <svg className={cx(S.main, {
      [S.todraw] : p.mode === 'draw'
    })} 
      ref='svg'
      onClick={this.newItem} onMouseUp={this.release.bind(this)} onMouseMove={this.ifdrag.bind(this)}
    >
      {Items}
      {Links}
      {Slots}
    </svg>
  }
}

// 由于是被redux connect的组件，可省去写PropTypes的环节
const sm = (s) => {
  return {
    kits : s.get('kits'),
    links : s.get('links'),
    mode : s.get('mode'),
  }
}

const dm = (d) => {
  return {

    newItem(x, y){
      d({ 
        type: 'new_item',
        x, y,
      })
    },

    grab(kid){
      d({ type: 'grab', kid})
    },

    moveTo(x, y){
      d({ type: 'move_to', x, y})
    },

    release()  {
      d({ type: 'release' })
    },

  }
}

export default connect(sm, dm)(Main);
