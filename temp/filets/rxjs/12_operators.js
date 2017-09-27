// React
/*
 * 测试debounceTime的用法
 */
import React, { PureComponent } from 'react'
import { render } from 'react-dom'
import Rx from 'rxjs/Rx'

class App extends PureComponent {

  /*
   * 特点
   * 1、一定会延时
   * 2、"电梯式"地等待，也就是如果鼠标不停地狂点，事件将一直不会触发
   */
  debounceTime = el=>{
    Rx.Observable.fromEvent(el, 'click')
      .debounceTime(300)
      .subscribe(() => {
        console.log('click');
      })
  }

  /*
   * 将事件流flattern
   */ 
  mergeAll0 = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    // 每点击一次就起一个定时器
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000)); 
    /*
     * 缺省这些定时器是无限并发的，即点击的次数越多，就有越多个计数器在同时工作
     */
    var firstOrder = higherOrder.mergeAll();
    firstOrder.subscribe(x => console.log(x));
  }

  mergeAll1 = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000).take(10));
    var firstOrder = higherOrder.mergeAll(2); // 最多只支持两个并发
    firstOrder.subscribe(x => console.log(x));
  }

  /*
   * 同并发数设为1时的mergeAll
   */
  concatAll = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var higherOrder = clicks.map(ev => Rx.Observable.interval(1000).take(4));
    var firstOrder = higherOrder.concatAll();
    firstOrder.subscribe(x => console.log(x));
  }

  /*
   * 先map，再concat
   */
  concatMap = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var result = clicks.concatMap(ev => Rx.Observable.interval(1000).take(4));
    result.subscribe(x => console.log(x));
  }

  /*
   * 和concatMap很像，本例和concatMap示例效果相同，代码区别是省掉了"ev=>"这一部分
   */
  concatMapTo = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var result = clicks.concatMapTo(Rx.Observable.interval(1000).take(4));
    result.subscribe(x => console.log(x));
  }

  /*
   * 这个官方示例未能说明exhaust的用法，现作笔记
   * 和mergeAll的共同点是：不支持并发，区别是exhaust将并发的流丢弃，而mergeAll则会排到后面
   */
  exhaust = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var higherOrder = clicks.map((ev) => Rx.Observable.interval(1000));
    var result = higherOrder.exhaust();
    result.subscribe(x => console.log(x));
  }

  /*
   * expand的用法有点意思，以后有时间再深究
   */
  expand = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var powersOfTwo = clicks.mapTo(1)
    /*
     * 这里x=>得到另一个observable
     */
      .expand(x => Rx.Observable.of(2 * x).delay(1000))
      .take(10); // expand是递归的，如果没有take，只要一次click触发，也将会无限执行下去

    powersOfTwo.subscribe(x => console.log(x));
  }

  // 看官方的图就很明了: 多条通道都取最新的值进行组合
  combineLatest = ev=>{
    const firstTimer = Rx.Observable.timer(0, 1000); // emit 0, 1, 2... after every second, starting from now
    const secondTimer = Rx.Observable.timer(500, 1000); // emit 0, 1, 2... after every second, starting 0,5s from now
    const combinedTimers = Rx.Observable.combineLatest(firstTimer, secondTimer);
    combinedTimers.subscribe(value => console.log(value));
  }

  combineAll = el=>{
    var clicks = Rx.Observable.fromEvent(el, 'click');
    var higherOrder = clicks.map(ev =>
      Rx.Observable.interval(Math.random()*2000).take(3)
    ).take(2);

    var result = higherOrder.combineAll();
    // 这个示例没有输出，原因不明
    result.subscribe(x => console.log(x));
  }

  render() {
    return <div>
      <button ref={this.mergeAll0}>mergeAll不限并发</button>
      <button ref={this.mergeAll1}>mergeAll 2个并发</button>
      <button ref={this.concatAll}>concatAll</button>
      <button ref={this.concatMap}>concatMap</button>
      <button ref={this.concatMapTo}>concatMapTo</button>
      <button onClick={this.combineLatest}>combineLatest</button>
      <button ref={this.combineAll}>combineAll</button>
      <button ref={this.exhaust}>exhaust</button>
      <button ref={this.expand}>expand</button>
      <button ref={this.debounceTime}>debounceTime</button>
    </div>
  }
}

render(<App />, document.getElementById('root'))

