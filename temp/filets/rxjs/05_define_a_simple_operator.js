/*
 * 实现一个简易的operator，比如乘以2
 */
import {interval, Observable} from 'rxjs'

const double = source => new Observable(observer=>{
  source.subscribe(x=>{
    observer.next(x*2)
  })
})

interval(1000).pipe(
  double,
).subscribe(x=>console.log('x', x))
