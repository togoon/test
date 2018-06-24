import React, { PureComponent, Children } from 'react'
import {findDOMNode} from 'react-dom'
import _ from 'lodash'

export default class Canvas extends PureComponent {
  componentDidMount(){
    this.canvas = findDOMNode(this)
    this.ctx = this.canvas.getContext("2d");
    this.draw()
  }

  draw = ()=>{
    const {canvas:{width, height}, ctx} = this
    const {children} = this.props
    ctx.clearRect(0, 0, width, height)
    Children.forEach(children, ({type:func, props})=>{
      func(ctx)(props)
    })
    window.requestAnimationFrame(this.draw)
  }

  render() {
    return <canvas {..._.omit(this.props, 'children')} />
  }
}
