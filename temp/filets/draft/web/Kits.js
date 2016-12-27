// svg里的图元集合（不包括边）
import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import DefKit from './Kit.js'
import Mysql from './widgets/Mysql.js'
import Storage from './widgets/Storage.js'
import {css} from './utils/cssobj.js'

const C = css({
  grab:{
    cursor: 'grab'
  },
})


// 图元的映射
const widgetMap = {
  mysql : Mysql,
  storage : Storage,
}

class Kits extends PureComponent {

  // 用于在拖动时正确计算图元的坐标
  drag_delta = {
    dx : null,
    dy : null,
  }

  onClick(id, e){
    e.stopPropagation()
    const p = this.props 
    p.pick_kit(id)
  }

  onMouseDown(kid, e) {

    e.stopPropagation()

    const p = this.props
    const kit = p.kits.get(kid)
    
    this.drag_delta = {
      dx : kit.x - e.clientX,
      dy : kit.y - e.clientY,
    }

    p.grab(kid)
  }

  onMouseMove(e) {
    const p = this.props
    const r = this.refs
    
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

    const Items = []
    p.kits.forEach((item, id) => {
      const Kit =  widgetMap[item.type] || DefKit // 取到组件类
      Items.push(<Kit key={id} x={item.x} y={item.y} name={item.type} onMouseDown={this.onMouseDown.bind(this, id)} 
        onClick={this.onClick.bind(this, id)} 
        />)
    })

    return <g onMouseMove={this.onMouseMove.bind(this)} className={C.grab} >
      {Items}
    </g>
  }
}

const sm = (s) => {
  return {
    kits : s.get('kits'),
    mode : s.get('mode'),
  }
}

const dm = (d) => {
  return {
    pick_kit(id){
      d({ type: 'pick_kit', id})
    },

    grab(kid){
      d({ type: 'grab', kid})
    },

    moveTo(x, y){
      d({ type: 'move_to', x, y})
    },

  }
}

export default connect(sm, dm)(Kits)

