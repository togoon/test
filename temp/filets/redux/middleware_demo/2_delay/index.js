import { createStore, applyMiddleware } from 'redux'

// 延时中间件
const delay = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action)
  }

  let timeoutId = setTimeout(
    () => next(action),
    action.meta.delay
  )

  return function cancel() {
    clearTimeout(timeoutId)
  }
}

let createStoreWithMiddleware = applyMiddleware(delay)(createStore)

let store = createStoreWithMiddleware( ( state, action ) => {
  // 首次初始化的那一次调用，不延时
  // 估计是没有走dispatch，第二个这条日志则会在3秒之后，才打出来
  console.log("action!"); 
  return {
    x: "heihei",
    y: action.type
  }
})

store.dispatch({
  type: "haha",
  meta: {
    delay: 3000
  }
})

console.log("==================");
console.log(store.getState());
