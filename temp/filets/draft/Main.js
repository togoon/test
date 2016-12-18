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
})

// 图元的映射
const widgetMap = {
  mysql : Mysql,
  storage : Storage,
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
        to : 'm1',
      },
      l2 : {
        from : 's2',
        to : 'm2',
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

  test() {
    console.log("haha")
  }
  
  render() {
    let s = this.state

    let Items = _.map(s.kits, (item, i) => {
      let Cls =  widgetMap[item.type] // 取到组件类
      return <Cls key={i} x={item.x} y={item.y} />
    })

    let Slots = _.map(s.kits, (item, i ) => {
      let model = models[item.type] // 取到逻辑model
      // 暂时先弄输出吧

      let pos = {
        x : item.x+50,
        y : item.y,
        width: 10,
        height: 10,
        fill : 'chocolate',
      }

      let Ins = _.map(item.in, (key, type) => {
        let props = {

        }
        return <g>
          <rect {...pos} />
          <text {...pos}>{key}</text>
        </g>
      })

      return <g>
        <rect {...pos} />
        <text {...pos}>{model.out}</text>
      </g>

    })

    let Links = _.map(s.links, (item, i ) => {
      let from = s.kits[item.from]
      let to = s.kits[item.to]
      
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
/*
      <Mysql x={ 100 } y={ 100 } onClick={this.test}/>
      <Mysql x={300} y={200} />
      <Storage x={300} y={40} />
 */
