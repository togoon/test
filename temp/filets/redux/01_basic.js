// React
/*
 * redux初探
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
// store所有方法都是自绑定
const {dispatch, getState, subscribe} = store

subscribe(()=>console.log('changed!', getState()))

dispatch({type:'add'})
dispatch({type:'sub'})

