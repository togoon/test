/*
 * 一个NEVER常量. 不发生任何事情, not even complete
 */
import {NEVER} from 'rxjs'
import {startWith} from 'rxjs/operators'

function info() {
  console.log('Will not be called');
}
const result = NEVER.pipe(startWith(7));
result.subscribe(x => console.log(x), info, info);
