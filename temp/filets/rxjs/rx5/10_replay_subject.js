// React
import Rx from 'rxjs/Rx'

/*
 * replay subject: 在behavior基础上，为新的订阅者缓存回放一定长度过去的状态
 */

// 除了指定缓存的个数外，还可以指定缓存多长时间的状态
var subject = new Rx.ReplaySubject(3); // 缓存3个状态


subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);
subject.next(3);
subject.next(4);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(5);
