/*
 * 自己定义operator
 * 详见 <url:https://github.com/ReactiveX/rxjs/blob/master/doc/pipeable-operators.md>
 */
import { interval, Observable } from 'rxjs';
import { filter, map, take, toArray } from 'rxjs/operators';

/*
 * 实现每n个取一个的operator
 */

// 最原始的实现
const takeEveryNth = n => source =>
  new Observable(observer => {
    let count = 0;
    return source.subscribe({
      next(x) {
        if (count++ % n === 0) observer.next(x);
      },
      error(err) { observer.error(err); },
      complete() { observer.complete(); }
    })
  });

// 简单一点的版本
const takeEveryNthSimple = n => source =>
  source.pipe(filter((value, index) => index % n === 0 ))

// 最简单的版本
const takeEveryNthSimplest = n => filter((value, index) => index % n === 0);

interval(10).pipe(
  takeEveryNth(2),
  map(x => x + x),
  takeEveryNthSimple(3),
  map(x => x * x),
  takeEveryNthSimplest(4),
  take(3),
  toArray()
)
.subscribe(x => console.log(x));
// [0, 2304, 9216]
