// React
import React, { PureComponent, Component} from 'react'
import { render } from 'react-dom'
import _ from 'lodash'
import injectSheet from 'react-jss'
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';

import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import MobxDev from 'mobx-react-devtools'

import {abs} from './utils/cssobj.js'
import {H} from './utils/components/Flex.js'

import {TopInsertable} from './utils/components/Insertable.js'

class Store {
  @observable list = [1, 2, 3, 'x']

  @observable value = 4

  @action onSortEnd = ({oldIndex, newIndex}) => {
    this.list = arrayMove(this.list, oldIndex, newIndex)
  }

  @action onDrop = idx =>{
    let {list, value} = this
    list = [...list] // 克隆一下
    list.splice(idx, 0, value++)
    this.list = list
    this.value = value
  }

}

const SortableItem = SortableElement(TopInsertable)

const SortableList = SortableContainer(({list, onDrop}) => {
  const item = {
    height : 30,
    border : '1px solid gray',
  }
  const hitem = {
    width : 100,
    border : '1px solid gray',
    position : 'relative',
  }

  return <div>
    {_.map(list, (v,i) => {
      return <SortableItem key={v} index={i} style={item} onInsert={()=>onDrop(i)}
      >
        {v === 'x' ?  <H>
          <RightInsertable style={hitem}>
            A
          </RightInsertable>
          <RightInsertable style={hitem}>
            B
          </RightInsertable>
        </H>
        : v}
      </SortableItem>
    })}
  </div>
})

export class BottomInsertable extends PureComponent {
  state = {
    hover : false,
  }

  render() {
    const {children, 
      ...forward} = this.props
    const {hover} = this.state 

    const event = {
      onDragEnter : e=>{
        console.log('enter')
        this.setState({ hover : true })
      },
      onDragLeave : e=>{
        console.log('leave')
        this.setState({ hover : false })
      },
      // onDragOver : e=>{
      //   // e.preventDefault()
      //   console.log('over')
      // }, 
      onDrop : e=>{
        console.log('inner drop')
      }, 
      onDragExit : e=>{
        console.log('exit')
      }, 
    }

    const hbar = { // 水平bar
      left: 0, 
      cursor: 'ns-resize',
      width: '100%',
      height: 14,
      ...abs,
      zIndex : 1,
    }

    const Bottom = <div style={{
      bottom : -7, ...hbar,
    }} {...event}/>

    const main =  [<div {...forward} key={0}>
      {children}
      {Bottom}
    </div>]

    if ( !hover ) {
      return main
    } 
    else {
      return [
        ...main,
        <div key={1} style={{
          height : 10,
          backgroundColor : 'gray',
        }}/>
      ]
    }

  }
}

class RightInsertable extends PureComponent {
  state = {
    hover : false,
  }

  render() {
    const {children, 
      ...forward} = this.props
    const {hover} = this.state 

    const event = {
      onDragEnter : e=>{
        console.log('enter')
        this.setState({ hover : true })
      },
      onDragLeave : e=>{
        console.log('leave')
        this.setState({ hover : false })
      },
      onDragOver : e=>{
        console.log('over')
      }, 
      onDragExit : e=>{
        console.log('exit')
      }, 
    }

    const vbar = { // 竖直bar
      top: 0, cursor: 'ew-resize',
      width: 14,
      height: '100%',
      ...abs,
    }

    const Sensor = <div style={{
      right: -7, ...vbar,
    }} {...event} />

    const main =  [<div {...forward} key={0}>
      {children}
      {Sensor}
    </div>]

    if ( !hover ) {
      return main
    } 
    else {
      return [
        ...main,
        <div key={1} style={{
          width : 10,
          backgroundColor : 'gray',
        }}/>
      ]
    }
  }
}

@injectSheet({
  main : {
    width: 300,
  }, 
  dragger : {
    backgroundColor : 'lightblue',
  },
  item : {
    height : 30,
    border : '1px solid gray',
  }, 
})
@observer
class App extends Component {

  render() {
    const {classes:{main, dragger,}} = this.props
    const {list, onSortEnd, onDrop} = store

    return <div className={main}>
      <MobxDev />
      <div className={dragger} draggable>
        请拖动我
      </div>
      <SortableList list={list} onSortEnd={onSortEnd} onDrop={onDrop}/>
    </div>
  }
}

const store = new Store()

/*
 * 注：这里根本就不需要把store以属性的方式传给App，它就可以正常工作！
 * mobx实在是太强大了！
 */
render(<App />, document.getElementById('root'))

