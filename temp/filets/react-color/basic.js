// @flow React 
import React, { PureComponent } from 'react'
import {render} from 'react-dom'

import { SketchPicker } from 'react-color';

class App extends PureComponent {

  state = {
    background: '#fff', 
  };

  handleChange = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    const {background} = this.state 
    return <div>
      <div style={{backgroundColor : background }} >
        测试
      </div>
      <SketchPicker
        color={background}
        onChange={ this.handleChange }
      />
    </div>
  }
}

render(<App />, document.getElementById('root'))

