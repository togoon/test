import React, { Component, PropTypes } from 'react'

class Storage extends Component {

  render() {
    let p = this.props
    
    return <g transform={`translate(${p.x} ${p.y})`} onClick={p.onClick}>
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
}

export default Storage

