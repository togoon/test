/*
 * 根据鼠标移动产生类似水波的效果
 * 使用的是 TransitionMotion
 * react motion用来实现这样的效果非常非常强大！
 * 重点演示willleave的使用。因为水波泛起后最终会消失，很符合willleave的场景
 */
import React from 'react';
import { render } from 'react-dom'
import {TransitionMotion, spring} from 'react-motion';

import './index.css'

const leavingSpringConfig = {stiffness: 60, damping: 15};

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mouse: [], now: 't' + 0};
  };

  handleMouseMove = ({pageX, pageY}) => {
    // Make sure the state is queued and not batched.
    this.setState(() => {
      return {
        mouse: [pageX - 25, pageY - 25],
        now: 't' + Date.now(),
      };
    });
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  willLeave = (styleCell) => { 
    return {
      ...styleCell.style, // 一边放大一边淡出fadeout
      opacity: spring(0, leavingSpringConfig),
      scale: spring(2, leavingSpringConfig),
    };
  };

  render() {
    const {mouse: [mouseX, mouseY], now} = this.state;

    /*
     * 水波特效的稳定状态，只需要一个鼠标当前的位置
     * 而鼠标之前的位置，就让它们自觉leave
     */
    const styles = mouseX == null ? [] : [{ // 注：除了初始状态，之后都不会为null
      key: now,
      style: {
        opacity: spring(1),
        scale: spring(0),
        x: spring(mouseX),
        y: spring(mouseY),
      }
    }];

    return (
      <TransitionMotion willLeave={this.willLeave} styles={styles}>
        {circles =>
          <div
            onMouseMove={this.handleMouseMove}
            onTouchMove={this.handleTouchMove}
            className="demo7">
            {circles.map(({key, style: {opacity, scale, x, y}}) =>
              <div
                key={key}
                className="demo7-ball"
                style={{
                  opacity: opacity,
                  scale: scale,
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
                }} />
            )}
          </div>
        }
      </TransitionMotion>
    );
  };
}

render(<Demo />, document.getElementById('root'))
