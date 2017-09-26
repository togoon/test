// React
import Rx from 'rxjs/Rx'

/*
 * 介绍rx里的核心概念模型: observable，暂时叫它观察件、观察物、观察器
 * 它是一个可被观察（订阅）到数据的容器
 */

var observable = Rx.Observable.create(function (observer) {
  /*
   * 构造一个观察器，将部署好其可被观察到的数值
   * 先同步地指定1, 2, 3
   */
  observer.next(1);
  observer.next(2);
  observer.next(3);

  /*
   * 几秒之后，再指定一个4，结束
   */
  setTimeout(() => {
    observer.next(4);
    observer.complete();
  }, 2000);

});

console.log('just before subscribe');

/*
 * 要想获取（接收）到观察器里的数据，需要对其订阅
 */
observable.subscribe({
  next: x => console.log('got value ' + x), // 事件触发，像一个流
  error: err => console.error('something wrong occurred: ' + err), // 出错
  complete: () => console.log('done'), // 结束
});
console.log('just after subscribe');
