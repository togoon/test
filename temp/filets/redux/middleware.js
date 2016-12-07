// 实际场景：每次action都用日志记录action的内容，以及action之后的状态 
//
// 尝试1: 手动记录 ===========================================

console.log('dispatching', action)
store.dispatch(action)
console.log('next state', store.getState())


// 尝试2: 封装dispatch ===========================================
function dispatchAndLog(store, action) {
  console.log('dispatching', action)
  store.dispatch(action)
  console.log('next state', store.getState())
}

dispatchAndLog(store, addTodo('Use Redux'))

// 尝试3: monkeypatching ===========================================

let next = store.dispatch
// 引入next变量，这个名字很重要！贯穿整个middleware的理念中
// 它代表的是：我（中间件）插在谁前面，的"谁"

store.dispatch = function dispatchAndLog(action) {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// 这样，原有的store.dispatch调用不需要替换

// 3.1 ==================
// 进一步封装成函数
function patch1(store) {
  // ...
}
function patch2(store) {
  // ...
}

patch1(store)
patch2(store)


// 尝试4: 将monkey patching的公共部分再提取 ===========================================

function logger(store) {
  let next = store.dispatch

  // 我们之前的做法:
  // store.dispatch = function dispatchAndLog(action) 
  // 这次选择先不着急干坏事，仅准备好成品

  return function dispatchAndLog(action) { // 这里对函数命名，是为了调试方便吗？
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}

// 真正干坏事的地方，在这里一次搞定
function applyMiddlewareByMonkeypatching(store, middlewares) {
  middlewares = middlewares.slice() // slice用于生成一个浅副本
  middlewares.reverse()

  // 在每一个 middleware 中变换 dispatch 方法。
  middlewares.forEach(middleware =>
    store.dispatch = middleware(store)
  )
}

applyMiddlewareByMonkeypatching(store, [ logger, crashReporter ])

// 尝试5: 再提取更多 ===========================================
// 思考上面的例子：
function logger(store) {

  // 能不能这一句也省掉呢? 每次都要写，很烦
  let next = store.dispatch

  return function dispatchAndLog(action) { // 这里对函数命名，是为了调试方便吗？
    console.log('dispatching', action)
    let result = next(action)
    console.log('next state', store.getState())
    return result
  }
}

// 于是继续改：
// 下面的函数名主要是为了注释的需要，实际是可以省的
function logger(store) {
  return function wrapDispatchToAddLogging(next) {
    return function dispatchAndLog(action) {
      console.log('dispatching', action)
      let result = next(action)
      console.log('next state', store.getState())
      return result
    }
  }
}
// 这时，next作为了一个参数。显然它肯定是在 applyMiddleware中被部署好的
// 我们用箭头函数令其柯里化：
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// 尝试6: 尝试实现基于上面的 applyMiddleware ===========================================
// 这只是一个极简的示例，并不是 redux的实现方式!
function applyMiddleware(store, middlewares) {
  middlewares = middlewares.slice()
  middlewares.reverse()

  let dispatch = store.dispatch
  middlewares.forEach(middleware =>
    dispatch = middleware(store)(dispatch)
  )

  return Object.assign({}, store, { dispatch })
}

// ================================= 总结 ====================================================
// 中间件的统一格式为
// 以下是一个什么事都不干（透传）的"空"中间件
const some_middleware = store => next => action => {
  // 为什么空的中间件也要有这个逻辑呢？
  // 这是一个

  return next(action)
}

// ======================= 来看看中间件的最终形态吧（直接抄文档的代码）=========================

// 这是一个打日志的中间件
const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

// 报告错误的中间件
const crashReporter = store => next => action => {
  try {
    return next(action)
  } catch (err) {
    console.error('Caught an exception!', err)
    Raven.captureException(err, {
      extra: {
        action,
        state: store.getState()
      }
    })
    throw err
  }
}

import { createStore, combineReducers, applyMiddleware } from 'redux'

// 使用中间件，得到另一个creator
let createStoreWithMiddleware = applyMiddleware(logger, crashReporter)(createStore)

// 跟createStore一样地使用
let todoApp = combineReducers(reducers)
let store = createStoreWithMiddleware(todoApp)

// 后面的代码，都不变
store.dispatch(addTodo('Use Redux'))

