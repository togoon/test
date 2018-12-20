import {fraction, add} from 'mathjs'

const a = add(fraction(1,3), fraction(2, 5))
console.log('a', a) // fraction原始对象
console.log('a', a.toFraction()) // 以分数的形式打印
