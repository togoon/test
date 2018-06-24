// React 
import React, { PureComponent} from 'react'
import {render} from 'react-dom'

import Canvas from './components/Canvas.js'
import Background from './components/Background.js'
import world from './models/world.js'

class App extends PureComponent {
  render() {
    return <Canvas width={500} height={512}>
      <Background world={world} />
    </Canvas>
  }
}

render(<App /> , document.getElementById('root')) 
