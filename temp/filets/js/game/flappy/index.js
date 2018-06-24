// React 
import React, { PureComponent} from 'react'
import {render, findDOMNode} from 'react-dom'

import background from './img/background.png'

const width = 500
const height = 512
const x = 0

class App extends PureComponent {
  componentDidMount(){
    this.ctx = findDOMNode(this).getContext("2d");

    this.background = new Image()
    this.background.src = background
    this.background.onload = this.draw
  }

  draw = ()=>{
    this.ctx.clearRect(0, 0, width, height)
    const bgWidth = this.background.width
    for(var i = 0; i < Math.ceil(width / bgWidth) + 1; i++){
      this.ctx.drawImage(this.background, i * bgWidth - Math.floor(x%bgWidth), 0)
    }
    window.requestAnimationFrame(this.draw)
  }

  render() {
    return <canvas width={width} height={height} style={{
      border : '1px solid black',
    }}  />
  }
}

render(<App /> , document.getElementById('root')) 
