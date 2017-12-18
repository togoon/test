// React 
/*
 * flex的最基本的用法
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import {H} from './utils/components/Flex.js'

class Test extends PureComponent {
  render() {
    const main = {
      height : 100,
      width : 200, 
    }

    const item = {
      flex : 1,
    }

    // 最终两个div的width是平分
    return <H style={main} >
      <div style={{...item, 
        width : 0,
        backgroundColor:'cyan',
      }} />
      <div style={{...item, 
        width : 9999,
        backgroundColor:'lightblue',
      }} />
    </H>
  }
}

render(<Test />, document.getElementById('root'))

