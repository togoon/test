/*
 * 手写一个interval的observable
 */
import {Observable} from 'rxjs'
import {ptimeout} from './utils/modash.js'

// 这是官方给的一个例子，其实这样得到的interval并不是同一个源头
const interval = new Observable(observer=>{
  let i = 0
  window.setInterval(()=>{
    observer.next(i++)
  } ,1000)
})

;(async ()=>{
  const s1 = interval.subscribe(x=>console.log(x))
  await ptimeout(3000)
  interval.subscribe(x=>console.log('x',x))
  await ptimeout(3000)
  s1.unsubscribe() // 取消订阅
})();
