// React
/*
 * 手写一个redux thunk中间件，实现异步功能
 */
import {createStore, applyMiddleware} from 'redux'

function reducer(s = 0, a) {
  const {type} = a
  if ( type === 'add' ) {
    return s+1
  } 
  return s
}

const thunk = store => next => action => {
  if ( typeof action === 'function' ) {
    action(store.dispatch, store.getState)
  } 
  else {
    next(action)
  }
}

const store = applyMiddleware(thunk)(createStore)(reducer)
store.subscribe(()=>console.log('changed!', store.getState()))
store.dispatch(d=>window.setTimeout(()=>d({type:'add'}), 2000)) // 2秒钟之后再触发

