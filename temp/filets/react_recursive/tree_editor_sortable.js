// React 
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import _ from 'lodash'

import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

let counter = 0

const Item = SortableElement('div')

@SortableContainer
class EditorInner extends PureComponent {

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
    const {value} = this.props
    const {add, submenu, subedit, del} = this

    return <div style={{paddingLeft:20}} >
      {_.map(value, ({name, link}, i ) => {

        const item = {
          key : i,
          index : i,
        }

        if ( _.isString(link) ) {
          return <Item {...item}>
            {name} | {link}
            <button onClick={submenu.bind(null, i)}>子菜单</button>
            <button onClick={e=>del(i)}>删除</button>
          </Item>
        } 
        // 如果是一个数组，递归渲染一个Editor
        return <Item {...item}>
          {name}
          <Editor value={link} onChange={v=>subedit(i, v)} />
        </Item>
      })}
      <button onClick={add}>添加</button>
    </div>
  }
}

/*
 * Editor的主入口
 */
class Editor extends PureComponent {
  render() {
    const {onChange, value} = this.props
    const props = {
      ...this.props,
      onSortEnd : ({oldIndex, newIndex}) => {
        onChange(arrayMove(value, oldIndex, newIndex))
      },
    }
    return <EditorInner {...props}/>
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
      <Editor value={items} onChange={v=>this.setState({ items : v })} />
    </div>
  }
}

render(<Container />, document.getElementById('root'))

