/*
 * 每隔一秒钟打印（序号）
 */
import {interval} from 'rxjs'

interval(1000).subscribe(x=>console.log(x))
