// React
/*
 * 通过一个按钮控制方块左右滑动的例子
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import {Motion, spring} from 'react-motion'

const st_bar = {
  backgroundColor: `rgb(240, 240, 232)`,
  width: 450,
  height: 50,
}

const st_block = {
  width: 50,
  height: 50,
  backgroundColor: `rgb(130, 181, 198)`,
}

const Box = p => <div style={st_bar} >
  <div style={{ transform: `translate3d(${p.x}px, 0, 0)`, ...st_block, }} />
</div>

class Demo extends PureComponent {

  state = {flag: false} // 一个开关状态

  onClick(){ // 点击时切换开关状态
    this.setState({flag: !this.state.flag})
  }

  render() {
    const s = this.state 

    // 由flag来令x在400和0间切换，并装上spring
    const motor = {x: spring(s.flag ? 400 : 0)}

    return (
      <div>
        <button onClick={this.onClick.bind(this)} > Toggle </button>
        <Motion style={motor}>
          {Box}
        </Motion>
      </div>
    );
  };
}

render(<Demo />, document.getElementById('root'))

