/*
 * 手写一个interval的observable。 单一源头的实现
 * 但似乎interval的资源无法回收
 */
import {Observable} from 'rxjs'
import {ptimeout} from './utils/modash.js'

let observers = []

let i = 0
window.setInterval(()=>{
  i++
  observers.forEach(observer=>observer.next(i))
} ,1000)

const interval = new Observable(observer=>{
  observers.push(observer)
})

;(async ()=>{
  const s1 = interval.subscribe(x=>console.log(x))
  await ptimeout(3000)
  interval.subscribe(x=>console.log('x',x))
  await ptimeout(3000)
  s1.unsubscribe() // 取消订阅
})();
