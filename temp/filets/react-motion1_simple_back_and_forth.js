// React
/*
 * 方块滑动的例子
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import {Motion, spring} from 'react-motion'

class Demo extends PureComponent {

  state = {open: false}

  onClick(){
    this.setState({open: !this.state.open});
  }

  render() {
    const st_demo0 = {
      borderRadius: 4,
      backgroundColor: `rgb(240, 240, 232)`,
      width: `450px`,
      height: `50px`,
    }

    const st_block = {
      width: 50,
      height: 50,
      borderRadius: 4,
      backgroundColor: `rgb(130, 181, 198)`,
    }

    return (
      <div>
        <button onClick={this.onClick.bind(this)} > Toggle </button>

        <Motion style={{x: spring(this.state.open ? 400 : 0)}}>
          {({x}) =>
            // children is a callback which should accept the current value of
            // `style`
            <div className="demo0" style={st_demo0} >
              <div className="demo0-block" style={{
                transform: `translate3d(${x}px, 0, 0)`,
                ...st_block,
              }} />
            </div>
          }
        </Motion>
      </div>
    );
  };
}

render(<Demo />, document.getElementById('root'))

