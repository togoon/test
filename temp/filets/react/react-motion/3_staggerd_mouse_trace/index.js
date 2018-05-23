/*
 * 这是一个用若干图标来组成一个相互错开的(staggerd)鼠标轨迹的动画效果的例子
 * 和最基本例子的区别是需要的参数变成了复数：
 * defaultStyles, styles（变成了一个函数）
 */
import React from 'react';
import {StaggeredMotion, spring, presets} from 'react-motion';
import { render } from 'react-dom'
// import range from 'lodash.range';
import _ from 'lodash'

import './test.css'

export default class Demo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {x: 250, y: 300} // 表示当前鼠标状态，整个demo就只有这一个state
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('touchmove', this.handleTouchMove);
  };

  handleTouchMove = ({touches}) => { // touch事件先不管
    this.handleMouseMove(touches[0]);
  };

  // 强大！用等号的方法可以解决每次都要手动绑定的问题，太棒了！
  handleMouseMove = ({pageX: x, pageY: y}) => {
    this.setState({x, y});
  };

  getStyles = (prevStyles) => {
    // `prevStyles` is the interpolated value of the last tick
    const endValue = prevStyles.map((_, i) => {
      return i === 0
        ? this.state
        : {
          x: spring(prevStyles[i - 1].x, presets.gentle), // presets.gentle是一个动画函数，该设置带一点弹性的效果
          y: spring(prevStyles[i - 1].y, presets.gentle),
          // x: spring(prevStyles[i - 1].x),
          // y: spring(prevStyles[i - 1].y),
        };
    });
    return endValue;
  };

  render() {
    return (
      <StaggeredMotion
        defaultStyles={_.range(6).map(() => ({x: 0, y: 0}))}
        styles={this.getStyles}>
        {balls =>
          <div className="demo1">
            {balls.map(({x, y}, i) =>
              <div
                key={i}
                className={`demo1-ball ball-${i}`}
                style={{
                  transform: `translate3d(${x - 25}px, ${y - 25}px, 0)`, // 这里25的修正值是因为ball的直径为50
                  zIndex: balls.length - i,
                }} />
            )}
          </div>
        }
      </StaggeredMotion>
    );
  };
}

render(<Demo />, document.getElementById('root'))

