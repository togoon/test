import React, { Component, PropTypes} from 'react'

import _ from 'lodash'
import cx from 'classnames'

import {css, border as bd, hsl, bg, flex, } from './utils/cssobj.js'
import Mysql from './widgets/Mysql.js'
import Storage from './widgets/Storage.js'
import models from './ObjType.js'

const S = css({
  main: {
    ...bd,
    ...bg(hsl(178, 32, 75)),
    ...flex(1),
  },

  todraw: {
    cursor: "crosshair",
  },

  kit : {
    '&:hover' : {
      cursor : 'grabbing',
    },
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

class Main extends Component {

  state = {
    kits : { // 图元数据
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
    },

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

  }

  hasBrush() {
    let p = this.props
    return !_.isNull(p.brush) 
  }

  onClick() {
    let p = this.props

    if ( this.hasBrush() ) {
      console.log("draw:" + p.brush)
    }
  }

  render() {
    const s = this.state

    let Items = _.map(s.kits, (item, i) => {
      let Cls =  widgetMap[item.type] // 取到组件类
      return <Cls key={i} x={item.x} y={item.y} className={S.kit}/>
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

    const Slots = _.map(s.kits, (item, i ) => {

      let model = models[item.type] // 取到逻辑model

      let gp = {
        stroke : 'black',
        strokeWidth : 0.5,
      }

      // 输入插口
      let Ins = (()=>{

        const gen = posGen(item.x, item.y, _.size(model.in), 0)

        slot_coords[i] = slot_coords[i] || {}
        let xys = slot_coords[i].in = {}

        return _.map(model.in, ( type, key) => {

          let rid = `slot_${i}_${key}`

          const xy = gen() // 取到当前插口坐标

          xys[key] = xy // 缓存

          return <g {...gp}>
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

        slot_coords[i] = slot_coords[i] || {}
        let xys = slot_coords[i].out = {}

        let outs = model.out

        if ( !_.isObject(outs) ) {
          outs = { out : outs }
        }

        const gen = posGen(item.x, item.y, _.size(outs), 1)

        return _.map(outs, ( type, key) => {
          let rid = `slot_${i}_${key}`
          const xy = gen()

          xys[key] = xy // 缓存

          return <g  {...gp}>
            <rect id={rid} width={10} height={10} fill='cornsilk' {...xy} />
            <text {...xy} visibility="hidden">
              {key}
              <set attributeName="visibility" from="hidden" to="visible" begin={`${rid}.mouseover`} end={`${rid}.mouseout`} />
            </text>
          </g>
        })

      })()

      return [...Ins, ...Outs]

    })

    let Links = _.map(s.links, (item, i ) => {
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
      [S.todraw] : this.hasBrush()
    })} 
      onClick={this.onClick.bind(this)}
    >
      {Items}
      {Links}
      {Slots}
    </svg>
  }
}

Main.propTypes = {
  brush: PropTypes.number,
}

export default Main;
