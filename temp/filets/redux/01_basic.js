// React
/*
 * 一个最小的redux模型
 */
import { createStore } from 'redux'

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

const store = createStore(reducer)

store.subscribe(()=>console.log('changed!', store.getState()))

store.dispatch({type:'add'})
store.dispatch({type:'sub'})

