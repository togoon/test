// React
/*
 * 演示拼接中间件的手动组合
 * 本示例是为了证明一个定理：任何中间件系统的中间件，都是可以手动组合的，虽然系统通常必然会提供更便利的方法
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

const logger1 = store => next => action => {
  console.log('action:', action)
  next(action)
}

const logger2 = store => next => action => {
  next(action)
  console.log('state:', store.getState())
}

const logger = store => next => action => {
  logger1(store)(a=>{
    logger2(store)(next)(a)
  })(action)
}

/*
 * 下面'秀操作'的代码其实与以下代码等价（至少基本等价）
 * const store = applyMiddleware(logger1, logger2)(createStore)(reducer)
 */
const store = applyMiddleware(logger)(createStore)(reducer)

store.subscribe(()=>console.log('changed!'))

store.dispatch({type:'add'})
store.dispatch({type:'sub'})

