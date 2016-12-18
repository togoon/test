import React, { Component, PropTypes } from 'react'

class Mysql extends Component {

  render() {
    let p = this.props
    
    return <g transform={`translate(${p.x} ${p.y})`} onClick={p.onClick}>
      <rect width="100" height="100" fill="yellow" />
      <text x="50" y="50" dx="-35" fontFamily="微软雅黑" fontSize="24" dominantBaseline="central">
        Mysql
      </text>
    </g>
  }
}

let { number, func } = PropTypes
Mysql.propTypes = {
  // 坐标
  x : number.isRequired,
  y : number.isRequired,
  onClick : func,
}

export default Mysql

