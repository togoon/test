// @flow React 
/*
 * 演示一个popup的color picker的实现
 * 手动实现了一个弹出 + 遮罩点击 -> 关闭的逻辑. 感觉这一部分的逻辑可以封装一下
 */
import React, { PureComponent } from 'react'
import {render} from 'react-dom'

import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'

class App extends PureComponent {
  state = {
    displayColorPicker: false,

    color: {
      r: '241',
      g: '112',
      b: '19',
      a: '1',
    },

  };

  handleClick = () => {
    this.setState({ displayColorPicker: !this.state.displayColorPicker })
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false })
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb })
  };

  render() {

    const styles = reactCSS({
      'default': {
        color: {
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });

    return (
      <div>
        <div style={ styles.swatch } onClick={ this.handleClick }>
          <div style={ styles.color } />
        </div>
        { 
          this.state.displayColorPicker ? 
          <div style={ styles.popover }>
            <div style={ styles.cover } onClick={ this.handleClose }/>
            <SketchPicker color={ this.state.color } onChange={ this.handleChange } />
          </div> : null 
        }

      </div>
    )
  }
}

render(<App />, document.getElementById('root'))

