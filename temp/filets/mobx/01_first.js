/* React
 * mobx初探
 */
import { render } from 'react-dom'
import React, { Component } from 'react'

import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

/*
 * 建一个observable的数据源
 */
var appState = observable({ 
    timer: 0
})

/*
 * 对observable的操作，用action包起来
 */ 
appState.resetTimer = action(function reset() {
    appState.timer = 0;
})

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000)

/*
 * 用observer来修饰组件
 */
@observer
class TimerView extends Component { // 不能使用pure component 
  render() {
    return (<button onClick={this.reset}>
      Seconds passed: {this.props.appState.timer}
    </button>);
  }

  reset = ()=>{
    this.props.appState.resetTimer();
  }
};

render(<TimerView appState={appState} />, document.getElementById('root'))

