import React, { PureComponent, PropTypes } from 'react'
import _ from 'lodash'

class Mysql extends PureComponent {

  render() {
    const p = this.props
    const p0 = _.omit(p, 'x', 'y')
    
    return <g transform={`translate(${p.x} ${p.y})`} {...p0}>
      <rect width="100" height="100" fill="yellow" />
      <text x="50" y="50" dx="-35" fontFamily="微软雅黑" fontSize="24" dominantBaseline="central">
        Mysql
      </text>
    </g>
  }
}

let { number, func, string } = PropTypes
Mysql.propTypes = {

  // 坐标
  x : number.isRequired,
  y : number.isRequired,

  // 透传
  onClick : func, // 鼠标事件响应
  className : string,
}

export default Mysql

