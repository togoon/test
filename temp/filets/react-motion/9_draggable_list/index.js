/*
 * 又一个很优雅的sortable的实现!!! 类似于前面的draggable ball
 * 之前也研究过另一个sortable，可以说已经是写得非常好了。
 * 但react motion全新的思路，大大简化了编码过程，太震撼！
 * 
 * 但仍然有一些值得思考的点：
 * > 元素的排列是通过坐标设置得到，而非DOM上的排列的顺序
 * > 元素的坐标需要手动计算并赋值
 */
import React from 'react';
import { render } from 'react-dom'
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';
import './index.css'

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = {stiffness: 300, damping: 50};
const itemsCount = 4;

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topDeltaY: 0,
      mouseY: 0,
      isPressed: false,
      originalPosOfLastPressed: 0,
      order: range(itemsCount),
    };
  };

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  };

  handleTouchStart = (key, pressLocation, e) => {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  };

  handleTouchMove = (e) => {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  };

  handleMouseDown = (pos, pressY, {pageY}) => {
    this.setState({
      topDeltaY: pageY - pressY,
      mouseY: pressY,
      isPressed: true,
      originalPosOfLastPressed: pos,
    });
  };

  handleMouseMove = ({pageY}) => {
    const {isPressed, topDeltaY, order, originalPosOfLastPressed} = this.state;

    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / 100), 0, itemsCount - 1);
      let newOrder = order;

      if (currentRow !== order.indexOf(originalPosOfLastPressed)){
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }

      this.setState({mouseY: mouseY, order: newOrder});
    }
  };

  handleMouseUp = () => {
    this.setState({isPressed: false, topDeltaY: 0});
  };

  render() {
    const {mouseY, isPressed, originalPosOfLastPressed, order} = this.state;

    return (
      <div className="demo8">
        {range(itemsCount).map(i => {
          const style = originalPosOfLastPressed === i && isPressed
            ? {
                scale: spring(1.1, springConfig),
                shadow: spring(16, springConfig),
                y: mouseY,
              }
            : {
                scale: spring(1, springConfig),
                shadow: spring(1, springConfig),
                y: spring(order.indexOf(i) * 100, springConfig),
              };
          return (
            <Motion style={style} key={i}>
              {({scale, shadow, y}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, i, y)}
                  onTouchStart={this.handleTouchStart.bind(null, i, y)}
                  className="demo8-item"
                  style={{
                    boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                    transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                    zIndex: i === originalPosOfLastPressed ? 99 : i,
                  }}>
                  {/*
                  {order.indexOf(i) + 1}
                  */}
                  {i+1}
                </div>
              }
            </Motion>
          );
        })}
      </div>
    );
  };
}

render(<Demo />, document.getElementById('root'))
