/*
 * 演示最简单的operator: map的使用
 */
import {interval} from 'rxjs'
import {map} from 'rxjs/operators'

interval(1000).pipe(
  map(x=>x*2)
).subscribe(x=>console.log(x))
