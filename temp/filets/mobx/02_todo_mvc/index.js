import React from "react";
import { render } from "react-dom";

/*
 * 官方提供的一个dev tools，非常厉害。只需要将其静静地渲染到页面的任何一个地方
 * 便可以使用其强大的调试功能!!
 */
import DevTools from "mobx-react-devtools";

import TodoList from "./components/TodoList";
import TodoListModel from "./models/TodoListModel";

const store = new TodoListModel();

render(
  <div>
    <DevTools />
    <TodoList store={store} />
  </div>,
  document.getElementById("root")
);

/*
 * 以下是操作store的示例
 */
store.addTodo("Get Coffee");
store.addTodo("Write simpler code");
store.todos[0].finished = true;

setTimeout(() => {
  store.addTodo("Get a cookie as well");
}, 2000);

// 暴露给window，用于可以在控制台调试
window.store = store;
