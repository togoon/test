/* React
 * mobx初探
 */
import { render } from 'react-dom'
import React, { Component } from 'react'

import {observable, action} from 'mobx';
import {observer} from 'mobx-react';

var appState = observable({
    timer: 0
})

appState.resetTimer = action(function reset() {
    appState.timer = 0;
})

setInterval(action(function tick() {
    appState.timer += 1;
}), 1000)

@observer
class TimerView extends Component { // 不能使用pure component 
  render() {
    return (<button onClick={this.onReset.bind(this)}>
      Seconds passed: {this.props.appState.timer}
    </button>);
  }

  onReset () {
    this.props.appState.resetTimer();
  }
};

render(<TimerView appState={appState} />, document.getElementById('root'))

