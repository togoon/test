// React 
/*
 * 在上一个例子的基础上
 * 用insertable来实现拖动排序
 * TODO：不支持跨层级拖动，但目前ui上没有作判断，所以如果跨层级拖动的话，会运行出错 
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import _ from 'lodash'

import {arrayMove} from 'react-sortable-hoc'

import './utils/css_preset.js'
import {TopInsertable} from './utils/components/Insertable.js'

let counter = 0

class Editor extends PureComponent {

  add = e=>{
    const {value, onChange} = this.props
    counter++
    const new_value = [...value, {
      name : 'a' + counter,
      link : 'b' + counter,
    }]
    onChange(new_value)
  }

  // 把第i项设为子菜单
  submenu = i =>{
    const {value, onChange} = this.props
    let new_value = [...value]
    const item = value[i]
    new_value[i] = {
      ...item,
      link : [],
    }
    onChange(new_value)
  }

  // 修改子菜单
  subedit = (i, v)=>{
    const {value, onChange} = this.props
    let new_value = [...value]
    const item = new_value[i]
    new_value[i] = {
      ...item,
      link : v,
    }
    onChange(new_value)
  }

  del = i=>{
    const {value, onChange} = this.props
    let new_value = [...value]

    new_value.splice(i, 1)

    onChange(new_value)
  }

  render() {
    const {value, onChange} = this.props
    const {add, submenu, subedit, del} = this

    return <div style={{paddingLeft:20}} >
      {_.map(value, (item, i ) => {
        const {name, link} = item

        const insertable = {
          key : i,
          draggable : true,
          onInsert : e=>{
            const from = e.dataTransfer.getData('idx')
            const new_value = arrayMove(value, from, i)
            console.log(`${from} -> ${i}`)
            onChange(new_value)
          },
          onDragStart : e=>{
            /*
             * 坑：如果这里不加会导致父元素的onDragStart也会触发，导致得不到期望的排序结果
             */
            e.stopPropagation()
            e.dataTransfer.setData('idx', i)
          }
        }

        if ( _.isString(link) ) {
          return <TopInsertable {...insertable}>
            {name} | {link}
            <button onClick={submenu.bind(null, i)}>子菜单</button>
            <button onClick={e=>del(i)}>删除</button>
          </TopInsertable>
        } 
        // 如果是一个数组，递归渲染一个Editor
        return <TopInsertable {...insertable}>
          {name}
          <Editor value={link} onChange={v=>subedit(i, v)} />
        </TopInsertable>
      })}
      <button onClick={add}>添加</button>
    </div>
  }
}

class Container extends PureComponent {
  state = {
    items : [
    ],
  }
  render() {
    const {items} = this.state 
    return <div>
      <Editor value={items} onChange={v=>this.setState({ items : v })}/>
    </div>
  }
}

render(<Container />, document.getElementById('root'))

