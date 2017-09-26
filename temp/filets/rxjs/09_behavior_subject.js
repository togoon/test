// React
import Rx from 'rxjs/Rx'

/*
 * behavior subject: 保存随着时间变化的一个值
 * 其与普通subject的区别是：behavior subject在新订阅时都会收到当前的最新值
 * 而普通subject则没有该行为，需要等到下一个值触发才会收到
 */
var subject = new Rx.BehaviorSubject(0); // 0 is the initial value

subject.subscribe({
  next: (v) => console.log('observerA: ' + v)
});

subject.next(1);
subject.next(2);

subject.subscribe({
  next: (v) => console.log('observerB: ' + v)
});

subject.next(3);
