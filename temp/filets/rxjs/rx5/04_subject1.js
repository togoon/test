// React
import Rx from 'rxjs/Rx'

/*
 * 演示subject概念
 * 其既是observable，同时又是observer
 */

var subject = new Rx.Subject();

subject.subscribe({ // subscribe是observable的方法
  next: (v) => console.log('observerA: ' + v)
});
subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(1); // 这里是observer的方法？
subject.next(2);
