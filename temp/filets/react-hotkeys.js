import React, { Component } from 'react'
import Radium from 'radium'
import {HotKeys} from 'react-hotkeys'


const handlers = {
  'moveLeft': (event) => console.log('Delete node hotkey called!'),
  'moveUp': (event) => console.log('Move up hotkey called!')
};

// 如果 'up' 不是一个动作的名字，则认为其是一个快捷键
const handlers = {
  'up': (event) => console.log('up key called')
};

// 示例
class Test extends Component {

  keyMap = {
    'removeObject': ['del', 'backspace'],
    'moveLeft': ['left', 'shift+left'],
    'moveRight': ['right', 'shift+right'],
    'moveUp': ['up', 'shift+up'],
    'moveDown': ['down', 'shift+down'],
    'closePath': ['enter']
  };

  render() {
    return (
      // 可以接收 keyMap 和 handlers 两个属性
      <HotKeys keyMap={keyMap}>
        <HotKeys handlers={handlers} />
      </HotKeys>
    )
  }
}

export default Radium(Test)

