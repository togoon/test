import React, { Component, PropTypes } from 'react'
import _ from 'lodash'

class Storage extends Component {

  render() {
    let p = this.props
    const p0 = _.omit(p, 'x', 'y')
    
    return <g transform={`translate(${p.x} ${p.y})`} {...p0}>
      <rect width="100" height="100" fill="burlywood" />
      <text x="50" y="50" dx="-45" fontFamily="微软雅黑" fontSize="24" dominantBaseline="central">
        Storage
      </text>
    </g>
  }
}

let { number, func } = PropTypes
Storage.propTypes = {

  // 坐标
  x : number.isRequired,
  y : number.isRequired,

  // 鼠标事件响应
  onClick : func,
  // ... 其他透传属性
}

export default Storage

