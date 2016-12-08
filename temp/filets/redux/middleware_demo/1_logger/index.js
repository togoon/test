/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

import { createStore, applyMiddleware } from 'redux'

// applyMiddleware 接收 createStore()
// 并返回一个包含兼容 API 的函数。
let createStoreWithMiddleware = applyMiddleware(logger)(createStore)

// 像使用 createStore() 一样使用它。
let store = createStoreWithMiddleware( ( state, action ) => {
  return {
    x: "heihei",
    y: action.type
  }
})

store.dispatch({
  type: "haha"
})

console.log("==================");
console.log(store.getState());
