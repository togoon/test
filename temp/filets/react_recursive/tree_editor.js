// React 
/*
 * 一个类似于树形菜单的编辑器
 * 演示递归组件的使用
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import _ from 'lodash'

let counter = 0

/*
 * Editor设计成react里controlled组件的规格
 */
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

  render() {
    const {value} = this.props
    const {add, submenu, subedit} = this

    return <div style={{paddingLeft:20}} >
      {_.map(value, (item, i ) => {
        const {name, link} = item
        if ( _.isString(link) ) {
          return <div key={i}>
            {name} | {link}
            <button onClick={submenu.bind(null, i)}>子菜单</button>
          </div>
        } 
        // 如果是一个数组，递归渲染一个Editor
        return <div key={i}>
          {name}
          <Editor value={link} onChange={v=>subedit(i, v)} />
        </div>
      })}
      <button onClick={add}>添加</button>
    </div>
  }
}

/*
 * 一个简单的container，用来control上面的editor
 */
class Container extends PureComponent {
  state = {
    /*
     * 传入的是一个空的数组
     * 但Editor的编辑之后，最终可以得到一个具有任意层次的复杂结构
     * 这就是递归组件的魅力
     */
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

