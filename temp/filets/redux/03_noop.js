// React
/*
 * 演示如何实现一个空action
 * 即该action什么事都没发生，不会触发subscribe
 * 这样如此简单的功能，也需要通过中间件才能实现
 */
import { createStore, applyMiddleware } from 'redux'

function reducer(s = 0, a) {
  const {type} = a
  if ( type === 'add' ) {
    return s+1
  } 
  else if ( type === 'sub' ) {
    return s-1
  } 
  return s 
}

const store = applyMiddleware(s=>next=>action=>(action.type === 'noop' || next(action)))(createStore)(reducer)

store.subscribe(()=>console.log('changed!', store.getState()))

store.dispatch({type:'noop'}) // 什么都没发生
store.dispatch({type:'add'})
store.dispatch({type:'other'}) // 这里虽然store没有改变，但还是触发了change


