// React
import Rx from 'rxjs/Rx'

/*
 * operator初探
 * 这里手写了一个operator，有一种"转换器"的感觉
 */
function multiplyByTen(input) {
  var output = Rx.Observable.create(function subscribe(observer) {
    input.subscribe({
      next: (v) => observer.next(10 * v),
      error: (err) => observer.error(err),
      complete: () => observer.complete()
    });
  });
  return output;
}

var input = Rx.Observable.from([1, 2, 3, 4])
var output = multiplyByTen(input)
output.subscribe(x => console.log(x))

