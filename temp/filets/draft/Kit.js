// 缺省的图元图案
import React, { PureComponent, PropTypes } from 'react'
import _ from 'lodash'

class Kit extends PureComponent {

  render() {
    const p = this.props
    const p0 = _.omit(p, 'x', 'y', 'name')
    
    return <g transform={`translate(${p.x} ${p.y})`} {...p0}>
      <rect width="100" height="100" fill="azure" />
      <text x="50" y="50" dx="-35" fontFamily="微软雅黑" fontSize="24" dominantBaseline="central">
        {p.name}
      </text>
    </g>
  }
}

let { number, string } = PropTypes
Kit.propTypes = {

  // 坐标
  x : number.isRequired,
  y : number.isRequired,
  name: string.isRequired,

  // 其他html属性的透传
  // onClick : func, // 鼠标事件响应
}

export default Kit

