// React
/*
 * react-motion的最简单示例
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import {Motion, spring} from 'react-motion'

export class Test extends PureComponent {
  /*
   * spring是react-motion提供的"发动机"，作为动画所依赖数据的"驱动来源"
   * 使用方法见下
   */
  render() {
    /*
     * Motion是动画效果的主容器
     * 动画所需要的数据，在style属性里面
     * > 这是一个纯逻辑上的容器，自身不会渲染任何html元素
     * > 其style属性只是用来存储动画的数据以及状态，跟react本来的style属性没有任何关系
     * > 子元素是一个函数（其实就是一个react的静态组件(component class)，而不是平常的react element）
     */
    return <Motion defaultStyle={{x: 0}} style={{x: spring(100)}}>
      {/*
        * 在任何时刻，Motion使用当前的状态（变化中的style）来召唤其里面的静态件
        * 内部组件根据变化的状态进行渲染，从而实现动画效果
        */}
      {p => <div>{p.x}</div>}
    </Motion>
  }

}

render(<Test />, document.getElementById('root'))

