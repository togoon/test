// React

import { observable, computed, autorun } from "mobx";
import _ from 'lodash'

/////////////////////////////////////////////////////////////
/*
 * 以下是一个完全没有使用mobx的一个演示. 从例子中可以看到
 * 每次我们对数据进行了修改之后，需要手动地调用一次report，这是一个很无聊的事情
 * mobx正是致力于解决这个问题
 */
/*

class TodoStore {

  todos = []; // todo列表

  // 一个geter
  get completedTodosCount() {
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  report() {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  // 增加一个todo方法
  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

const todoStore = new TodoStore();

todoStore.addTodo("read MobX tutorial");
console.log(todoStore.report());

todoStore.addTodo("try MobX");
console.log(todoStore.report());

todoStore.todos[0].completed = true;
console.log(todoStore.report());

todoStore.todos[1].task = "try MobX in own project";
console.log(todoStore.report());

todoStore.todos[0].task = "grok MobX tutorial";
console.log(todoStore.report());

 */

/*
 * 使用上了mobx的例子
 */
class ObservableTodoStore {
  @observable todos = [];

  @observable pendingRequests = 0;

  constructor() {
    /*
     * mobx的魔法：当this.report发生改变的时候，自动将其打印出来
     * 注意：是this.report发生改变，而非store改变。也就是说，如果store改变，但report没有改变时
     * autorun并不会被执行。
     * 下面的例子将会验证这一点
     */
    autorun(() => {
      const {report} = this
      console.log(report)
    });

    autorun(()=>{
      /*
       * 问：autorun到底是根据什么来判断res有没有被改变以决定这内部的函数是否要被调用的
       * 有时间一定要好好看看其源码
       */
      const {todos} = this
      const res = _.reduce(todos, (sum, a)=>sum + '|' + a.task, '')
      console.log(res)
    })
  }

  /*
   * computed的魔法：可以保证数据不会被重复计算
   * 它似乎可以非常精准地知道什么时候需要重新计算值
   */
  @computed get completedTodosCount() {
    console.log('completedTodosCount')
    return this.todos.filter(
      todo => todo.completed === true
    ).length;
  }

  @computed get report() {
    if (this.todos.length === 0)
      return "<none>";
    return `Next todo: "${this.todos[0].task}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`;
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null
    });
  }
}

// 创建了一个数据仓库
const observableTodoStore = new ObservableTodoStore();

// 手动对数据进行一些修改，验证自动响应的机制

observableTodoStore.addTodo("read MobX tutorial"); // 加一条todo，自动输出report
observableTodoStore.addTodo("try MobX"); // 再加一条todo，自动report
observableTodoStore.todos[0].completed = true; // 完成一条todo，自动report
/*
 * todo1的名字，由于report只关心todo0的名字，因此这次不会自动report
 */
observableTodoStore.todos[1].task = "try MobX in own project"; 
observableTodoStore.todos[0].task = "grok MobX tutorial"; // 自动report

const store = window.store = observableTodoStore
/*
 * 注：这里的completedTodosCount不会被重复计算
 */
console.log(store.completedTodosCount)
console.log(store.completedTodosCount)

