// React 
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import {H} from './utils/components/Flex.js'

/*
 * 演示overflow:hidden与否对flex布局的影响
 */
class Test extends PureComponent {
  render() {

    /*
     * 外部容器，框定宽度和高度
     */
    const main = {
      width : 200,
      height : 100,
    }

    const item = {
      flex : 1,
    }

    return <H style={main} >
      {/* 第一个div直接给很长的width，用来验证其width最终会受到flex的压缩 */}
      <div style={{...item, 
        backgroundColor:'cyan', 
        width:999,
        height : 100,
      }} />
      {/* 第二个div没有指定width，但是很深的层次里也放了一个width很大的div */}
      <div style={{...item,
        /*
         * 这里的hidden非常关键！只有加了这一项，当前div才会受flex的控制
         * 否则似乎flex shrink对其无效，它会把前一个同样是flex:1的div挤扁
         * 这简直就是个救命稻草啊
         */
        overflow : 'hidden',
      }} >
        <div>
          <div>
            <div style={{
              width: 888,
              height : 100,
              backgroundColor:'lightblue',
              maxWidth : '100%',
            }} />
          </div>
        </div>
      </div>
    </H>
  }
}

render(<Test />, document.getElementById('root'))

