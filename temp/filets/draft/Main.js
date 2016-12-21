import React, { PureComponent } from 'react'

import _ from 'lodash'
import cx from 'classnames'
import { connect } from 'react-redux'

import {css, border as bd, hsl, bg, flex, ptr} from './utils/cssobj.js'
import Mysql from './widgets/Mysql.js'
import Storage from './widgets/Storage.js'
import models from './kit_type.js'
import DefKit from './Kit.js'

const S = css({
  main: {
    ...bd,
    ...bg(hsl(178, 32, 75)),
    ...flex(1),
  },

  todraw: {
    cursor: "crosshair",
  },

  ptr,

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
function posGen(x, y, w, h, n, type) {
  // TODO: 后面可以考虑让其分担更多render里的细节
  // type: 0 in, 1 out

  const step = 20
  let i = 0
  // 起始相对位置
  const x0 = (w - (step * (n-1))) / 2
  const y0 = type ? -SLOT_HEIGHT : h-SLOT_HEIGHT

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

  state = {
    draw_link: 'off',

    // 画面的尺寸
    width: 0,
    height: 0,
  }

  // 插口组
  slot_coords = {
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

  // 缓存画link的信息
  draw_link = {
  }

  // 用于在拖动时正确计算图元的坐标
  drag_delta = {
    dx : null,
    dy : null,
  }

  onClick(e) {
    const p = this.props

    if ( p.mode !== 'draw' ) {
      return
    }

    const {top, left} = this.refs.svg.getBoundingClientRect()
    const x = e.clientX - left
    const y = e.clientY - top

    p.newItem(x, y)
  }

  onItemMouseDown(kid, e) {

    e.stopPropagation()

    const p = this.props
    const kit = p.kits.get(kid)
    
    this.drag_delta = {
      dx : kit.x - e.clientX,
      dy : kit.y - e.clientY,
    }

    p.grab(kid)
  }

  onItemClick(id, e){
    e.stopPropagation()
    const p = this.props 
    p.pick_kit(id)
  }

  onLinkClick(id, e) {
    e.stopPropagation()
    const p = this.props 
    p.pick_link(id)
  }

  onMouseUp() {
    // 注：本事件先于onClick发生
    const p = this.props 
    if( p.mode === 'draw' )
      return

    console.log("items", p.kits.toJS())

    p.release()
  }

  onMouseMove(e) {
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

  onInClick(kit, name) {
    const s = this.state 
    const p = this.props 
    if ( s.draw_link !== 'on' ) {
      return
    } 

    // 生成新的link信息
    p.new_link({
      ...this.draw_link,
      to: kit,
      to_port: name,
    })

    this.setState({ draw_link: 'off' })
  }
  
  onOutClick(kit, name) {
    this.draw_link = {
      from: kit,
      from_port: name,
    }

    this.setState({ 
      draw_link : 'on' ,
    })
  }

  makeSlots(id, x, y, w, h, model){

    let gp = {
      stroke : 'black',
      strokeWidth : 0.5,
    }

    // 输入插口
    let Ins = (()=>{

      const gen = posGen(x, y, w, h, _.size(model.in), 0)

      this.slot_coords[id] = this.slot_coords[id] || {}
      let xys = this.slot_coords[id].in = {}

      return _.map(model.in, ( type, key) => {

        let rid = `slot_${id}_${key}`

        const xy = gen() // 取到当前插口坐标

        xys[key] = xy // 缓存

        return <g key={rid} {...gp}>
          <rect id={rid} width={10} height={10} fill='chocolate' {...xy} onClick={this.onInClick.bind(this, id, key)} />
          <text {...xy} visibility="hidden">
            {key}
            <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
          </text>
        </g>
      })
    })()

    // 输出插口
    let Outs = (()=>{

      this.slot_coords[id] = this.slot_coords[id] || {}
      let xys = this.slot_coords[id].out = {}

      let outs = model.out

      if ( !_.isObject(outs) && _.isString(outs) ) {
        outs = { out : outs }
      }

      const gen = posGen(x, y, w, h, _.size(outs), 1)

      return _.map(outs, ( type, key) => {
        let rid = `slot_${id}_${key}`
        const xy = gen()

        xys[key] = xy // 缓存

        return <g key={rid} {...gp}>
          <rect id={rid} width={10} height={10} fill='cornsilk' {...xy} onClick={this.onOutClick.bind(this, id, key)} />
          <text {...xy} visibility="hidden">
            {key}
            <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
          </text>
        </g>
      })

    })()

    return [...Ins, ...Outs]
  }

  componentDidMount(){
    // 由于涉及到尺寸，因此确实必须要did mount之后才能更新，因此需要重复render. 很多类似的组件都无法避免这种情况
    const { width, height } = this.refs.svg.getBoundingClientRect()
    this.setState({ width, height })
  }

  render() {
    const p = this.props
    const s = this.state 

    let Items = []
    p.kits.forEach((item, id) => {
      const Kit =  widgetMap[item.type] || DefKit // 取到组件类
      Items.push(<Kit key={id} x={item.x} y={item.y} name={item.type} className={S.grab} onMouseDown={this.onItemMouseDown.bind(this, id)} 
        onClick={this.onItemClick.bind(this, id)} 
        />)
    })

    let Slots = []
    p.kits.forEach((item, id ) => {

      let model = models[item.type] // 取到逻辑model
      if ( !model ) {
        return
      } 
      Slots =  [...Slots, ...this.makeSlots(id, item.x, item.y, KIT_WIDTH, KIT_HEIGHT, model)]
    })

    let Links = null
    if ( s.width ) {
      // 生成大蓝图的插口
      // 注：这里使用了一些晦涩的逻辑，目的仅仅是为了复用makeSlots来生成大蓝图的插口
      const slots0 = this.makeSlots('_in_', 0, s.height, s.width, 0, { out: p.io.out })
      const slots1 = this.makeSlots('_out_', 0, 0, s.width, SLOT_HEIGHT, { in: p.io.in })
      Slots =  [...Slots, ...slots0, ...slots1]

      // 生成links
      Links = _.map(p.links, (item, id ) => {
        const from = slot_top_left_to_center(this.slot_coords[item.from].out[item.from_port || 'out'])
        const to = slot_top_left_to_center(this.slot_coords[item.to].in[item.to_port])

        let l =  {
          x1 : from.x,
          y1 : from.y,
          x2 : to.x,
          y2 : to.y,
          key : id,
        }

        return <line {...l} stroke="black" strokeWidth='5' className={S.ptr}
          onClick={this.onLinkClick.bind(this, id)} 
        />
      })

    }
    console.log("slot coords:", this.slot_coords)

    return <svg className={cx(S.main, {
      [S.todraw] : p.mode === 'draw'
    })} 
      ref='svg'
      onClick={this.onClick.bind(this)} onMouseUp={this.onMouseUp.bind(this)} onMouseMove={this.onMouseMove.bind(this)}
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
    io : s.get('io'),
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

    release(){
      d({ type: 'release' })
    },

    pick_kit(id){
      d({ type: 'pick_kit', id})
    },

    pick_link(id){
      d({ type: 'pick_link', id})
    },

    new_link(payload){
      d({ type: 'new_link', ...payload})
    },
  }
}

export default connect(sm, dm)(Main);
