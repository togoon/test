// React 
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Canvas from './Canvas.js'
import Background from './Background.js'
import world from './World.js'

class App extends PureComponent {
  render() {
    return <Canvas width={500} height={512}>
      <Background world={world} />
    </Canvas>
  }
}

render(<App /> , document.getElementById('root')) 
