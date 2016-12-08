// 中间件：
// 可以认为是插件的一种，所谓插件，其含义是：引入插件之后，其他部分还是按照原来的机制执行
// 即原有的代码不用改。但却有一些新的效果。有一种side effect的感觉
// 而中间件类型的插件，其更侧重于体现"中间"，即有一种承上启下的性质，类似一种"过滤"器，"变换器"
//
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
  // 因为中间件是一个承上启下的过程，即在中间某处加上自己的逻辑之后，其需要负责将管道接上
  // 即使中间件什么都不做，它仍然要做一下"接起来"这个动作
  // 如何做这个动作，涉及到中间件到底在哪里生效，以及上面几个参数的含义
  // 
  // . 中间件是针对store.dispatch函数进行
  // . redux最终取的是本函数中 action => {...}的部分作为dispatch的替代
  // . next指的是没有当前中间件之前的dispatch的样子。即它是一个接收action作为参数的函数
  //
  return next(action)

  // 所以，如果中间件要做点什么，大概是这样：
  // store => next => action => {
  //    // any code...
  //
  //    // 在某处有这样的调用
  //    let ret = next(action)
  //
  //    // any code...
  //
  //    return ret;
  // }

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

// ================================== 官方的7个例子 =========================================
/**
 * 记录所有被发起的 action 以及产生的新的 state。
 */
const logger = store => next => action => {
  console.group(action.type) // 跟上面例子相比，增加了日志分组，用于折叠
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

/**
 * 在 state 更新完成和 listener 被通知之后发送崩溃报告。
 */
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

/**
 * 用 { meta: { delay: N } } 来让 action 延迟 N 毫秒。
 * 在这个案例中，让 `dispatch` 返回一个取消 timeout 的函数。
 */
const timeoutScheduler = store => next => action => {
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

/**
 * 通过 { meta: { raf: true } } 让 action 在一个 rAF 循环帧中被发起。
 * 在这个案例中，让 `dispatch` 返回一个从队列中移除该 action 的函数。
 */
const rafScheduler = store => next => {
  let queuedActions = []
  let frame = null

  function loop() {
    frame = null
    try {
      if (queuedActions.length) {
        next(queuedActions.shift())
      }
    } finally {
      maybeRaf()
    }
  }

  function maybeRaf() {
    if (queuedActions.length && !frame) {
      frame = requestAnimationFrame(loop)
    }
  }

  return action => {
    if (!action.meta || !action.meta.raf) {
      return next(action)
    }

    queuedActions.push(action)
    maybeRaf()

    return function cancel() {
      queuedActions = queuedActions.filter(a => a !== action)
    }
  }
}

/**
 * 使你除了 action 之外还可以发起 promise。
 * 如果这个 promise 被 resolved，他的结果将被作为 action 发起。
 * 这个 promise 会被 `dispatch` 返回，因此调用者可以处理 rejection。
 */
const vanillaPromise = store => next => action => {
  if (typeof action.then !== 'function') {
    return next(action)
  }

  return Promise.resolve(action).then(store.dispatch)
}

/**
 * 让你可以发起带有一个 { promise } 属性的特殊 action。
 *
 * 这个 middleware 会在开始时发起一个 action，并在这个 `promise` resolve 时发起另一个成功（或失败）的 action。
 *
 * 为了方便起见，`dispatch` 会返回这个 promise 让调用者可以等待。
 */
const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }

  function makeAction(ready, data) {
    let newAction = Object.assign({}, action, { ready }, data)
    delete newAction.promise
    return newAction
  }

  next(makeAction(false))
  return action.promise.then(
    result => next(makeAction(true, { result })),
    error => next(makeAction(true, { error }))
  )
}

/**
 * 让你可以发起一个函数来替代 action。
 * 这个函数接收 `dispatch` 和 `getState` 作为参数。
 *
 * 对于（根据 `getState()` 的情况）提前退出，或者异步控制流（ `dispatch()` 一些其他东西）来说，这非常有用。
 *
 * `dispatch` 会返回被发起函数的返回值。
 */
const thunk = store => next => action =>
  typeof action === 'function' ?
    action(store.dispatch, store.getState) :
    next(action)

// 你可以使用以上全部的 middleware！（当然，这不意味着你必须全都使用。）
let createStoreWithMiddleware = applyMiddleware(
  rafScheduler,
  timeoutScheduler,
  thunk,
  vanillaPromise,
  readyStatePromise,
  logger,
  crashReporter
)(createStore)

let todoApp = combineReducers(reducers)
let store = createStoreWithMiddleware(todoApp)


