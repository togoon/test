// React 
// react-contexify 使用示例
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import './utils/css_preset.js'

import { ContextMenu, Item, Separator } from 'react-contexify';
import { ContextMenuProvider, menuProvider } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'

// 菜单项响应事件
function onClick(target, ref, data) {
  /*
   * target是触发事件那个最小粒度的dom元素
   * ref是被 context menu provider包裹的react元素的实例，如果有多个，则是多个实例数组。但在本例中，好像无效，原因不明
   * data还不知道有什么用
   */
  console.log(target, ref, data);
}

// 创建菜单组件。该组件是可以单个实例被多处共享的
// icon这里用的是font awesome，需要单独引入font awesome的css才能生效
const MyAwesomeMenu = () => {
  return (
    <ContextMenu id='menu_id'>
      <Item icon="fa fa-plus" onClick={onClick} >
        Add
      </Item>
      <Item icon="fa fa-trash" onClick={onClick} >
        Remove
      </Item>
      <Separator/>
      <Item icon="fa fa-clipboard" disabled >
        paste
      </Item>
    </ContextMenu>
  );
};


const Hodor = () => <div>Hodor</div>;
const Cersei = () => <div>Cersei</div>;
const Aria = () => <div>Aria</div>;

// 使用菜单方法一：包裹一层
const CerseiWithContextMenu = () => {
    return (
        <ContextMenuProvider id="menu_id">
            <Cersei x={1}/>
        </ContextMenuProvider>
    )
};

// 使用菜单方法二：柯里化成高阶组件。但高阶化之后，不能传参数了？
const addContextMenu = menuProvider('menu_id'); 
const HodorWithContextMenu = addContextMenu(Hodor);
const AriaWithContextMenu = addContextMenu(Aria);
const Div = addContextMenu('div')

const App = () => {
    return(
        <div>
            <CerseiWithContextMenu />
            <HodorWithContextMenu />
            <AriaWithContextMenu />
            <MyAwesomeMenu/>
            {/* 下面这个不能工作 */}
            <Div style={{height: 100}} >haha</Div> 
        </div>
    )
}


render(<App />, document.getElementById('root'))

