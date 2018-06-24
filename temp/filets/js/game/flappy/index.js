// React 
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Canvas from './Canvas.js'
import Background from './Background.js'

class App extends PureComponent {
  render() {
    return <Canvas width={500} height={512}>
      <Background x={0} />
    </Canvas>
  }
}

render(<App /> , document.getElementById('root')) 
