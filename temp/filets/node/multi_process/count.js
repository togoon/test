import _ from 'lodash'
import {ptimeout} from './utils/modash.js'
import {args} from './utils/node/args.js'
import 'colors'

const argv = args()
const name = _.get(argv, '_.0', 'count')
const count = +(_.get(argv, '_.1', 10))

;(async ()=>{
  for(let i = 0; i<count; i++) {
    console.log(`${name} ${i}`.yellow) // 颜色输出
    await ptimeout(1000)
  }
})()
