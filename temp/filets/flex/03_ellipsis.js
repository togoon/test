// React 
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import {H} from './utils/components/Flex.js'

/*
 * 演示如何与textOverflow:ellipsis结合使用
 * 进一步强化 overflow:hidden 所扮演的重要角色!!
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
         * 此处的hidden不能省，否则会自我膨胀
         */
        overflow: 'hidden',
      }} >
        <div>
          <div>
            <div style={{
              whiteSpace : 'nowrap',
              textOverflow : 'ellipsis',
              backgroundColor:'lightblue',
              /*
               * 此处的overflow:hidden也不能省，否则ellipsis不会生效
               */
              overflow : 'hidden',
            }}>
              这是一段很长的文字，看看会出现什么效果
            </div>
          </div>
        </div>
      </div>
    </H>
  }
}

render(<Test />, document.getElementById('root'))

