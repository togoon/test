import React from 'react';
import { render } from 'react-dom'
import {Motion, spring} from 'react-motion';
import {range} from 'lodash';

import './index.css'

/*
 * 弹簧的一些参数，相当于动画要用到的时间函数
 * stiffness越大，速度越快
 * damping好像是用来控制晃动效果的？
 */
const springSetting1 = {stiffness: 180, damping: 10}; // 球放大
// const springSetting2 = {stiffness: 5, damping: 17}; // 球移动
const springSetting2 = {stiffness: 120, damping: 17}; // 球移动

// 重新调整排位的函数
function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

// clamp一个值
function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

// 各个球的颜色
const allColors = [
  '#EF767A', '#456990', '#49BEAA', '#49DCB1', '#EEB868', '#EF767A', '#456990',
  '#49BEAA', '#49DCB1', '#EEB868', '#EF767A',
];

// 球的数量
const [count, width, height] = [11, 70, 90];

const seq = range(count)

// 初始化每个球的位置的坐标
const layout = seq.map(n => {
  const row = Math.floor(n / 3);
  const col = n % 3;
  return [width * col, height * row];
});

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      mouseXY: [0, 0], // 鼠标所在的坐标，经修正过为球心的位置

      mouseCircleDelta: [0, 0], // difference between mouse and circle pos for x + y coords, for dragging

      lastPress: null, // 虽然取名为lastPress，但实际是正在拖动着的球的编号
      isPressed: false, // 表示是否正在拖动着球

      // 当前球的排列顺序，初始为 [0, ..., 10]
      order: seq, // index: visual position. value: component key/id
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

  handleMouseMove = ({pageX, pageY}) => {
    const {order, lastPress, isPressed, mouseCircleDelta: [dx, dy]} = this.state;
    if (isPressed) {

      const mouseXY = [pageX - dx, pageY - dy];

      // 计算当前的坐标最接近于几排几列，最终得到其新位置
      const col = clamp(Math.floor(mouseXY[0] / width), 0, 2);
      const row = clamp(Math.floor(mouseXY[1] / height), 0, Math.floor(count / 3));
      const index = row * 3 + col;

      const newOrder = reinsert(order, order.indexOf(lastPress), index);
      this.setState({mouseXY, order: newOrder});
    }
  };

  /*
   * 按下某个键之后才会触发
   */
  handleMouseDown = (key, [pressX, pressY], {pageX, pageY}) => {
    /*
     * pressX, pressY是球中心的坐标
     * pageX, pageY是鼠标的精确坐标
     * 程序需要这两个值来算一个delta（凡是draggable的ui都需要这个东西）
     */
    this.setState({
      lastPress: key,
      isPressed: true,

      mouseCircleDelta: [pageX - pressX, pageY - pressY],
      mouseXY: [pressX, pressY],
    });
  };

  handleMouseUp = () => { // 松开拖动，相当于一个reset操作
    this.setState({isPressed: false, mouseCircleDelta: [0, 0]});
  };

  render() {
    const {order, lastPress, isPressed, mouseXY} = this.state;
    /*
     * 各个球在DOM中的顺序始终保持不变，由变换的参数来控制其显示中的位置
     */
    return (
      <div className="demo2">
        {seq.map(key => {  // 按序号遍历各个球

          let style;
          let x;
          let y;
          const visualPosition = order.indexOf(key); // 显示的位置

          if (key === lastPress && isPressed) { // 如果是正在拖着的球
            [x, y] = mouseXY;
            style = {
              translateX: x, // 取鼠标的位置为其位置，由于设置的是静态值，则不会有动画效果
              translateY: y,

              // 设置scale和阴影
              scale: spring(1.2, springSetting1),
              boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
            };
          } 
          else {
            [x, y] = layout[visualPosition]; // 取得其在棋盘中的位置
            style = {
              translateX: spring(x, springSetting2),
              translateY: spring(y, springSetting2),
              scale: spring(1, springSetting1),
              boxShadow: spring((x - (3 * width - 50) / 2) / 15, springSetting1),
            };
          }

          /*
           * render基本上是声明式的代码，非常直观，基本上无计算逻辑
           * 这便是react的魅力！
           */
          return (
            <Motion key={key} style={style}>
              {({translateX, translateY, scale, boxShadow}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                  className="demo2-ball"
                  style={{
                    backgroundColor: allColors[key],
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === lastPress ? 99 : visualPosition,
                    boxShadow: `${boxShadow}px 5px 5px rgba(0,0,0,0.5)`,
                  }}
                />
              }
            </Motion>
          );
        })}
      </div>
    );
  };
}

render(<Demo />, document.getElementById('root'))
