// React 
// react-contexify 使用示例
/* eslint-disable react/jsx-pascal-case */
import React from 'react'
import { render } from 'react-dom'
import _ from 'lodash'

import './utils/css_preset.js'

import { ContextMenu, Item, Separator } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'

function onClick(item, target) {
  // item is the item component on which you clicked. You can access all the props
  console.log(item);
  // target refer to the html node on which the menu is triggered
  console.log(target);
}

// 创建菜单，这个菜单是可以共享
const MyAwesomeMenu = () => {
  return (
    <ContextMenu id='menu_id'>
      <Item label="Add" icon="fa fa-plus" onClick={onClick} />
      <Item label="Remove" icon="fa fa-trash" onClick={onClick} />
      <Separator/>
      <Item label="Paste" icon="fa fa-clipboard" disabled />
    </ContextMenu>
  );
};

import { ContextMenuProvider, menuProvider } from 'react-contexify';

const Hodor = () => <div>Hodor</div>;
const Cersei = () => <div>Cersei</div>;
const Aria = () => <div>Aria</div>;

const CerseiWithContextMenu = () => {
    return (
        <ContextMenuProvider id="menu_id">
            <Cersei />
        </ContextMenuProvider>
    )
};
// or you can use the curried function to add the same menu for many components

const addContextMenu = menuProvider('menu_id'); 
const HodorWithContextMenu = addContextMenu(Hodor);
const AriaWithContextMenu = addContextMenu(Aria);

const App = () => {
    return(
        <div>
            <CerseiWithContextMenu />
            <HodorWithContextMenu />
            <AriaWithContextMenu />
            <MyAwesomeMenu/>
        </div>
    )
}


render(<App />, document.getElementById('root'))

