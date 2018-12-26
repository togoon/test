import {fraction, add} from 'mathjs'

const a = add(fraction(1,3), fraction(2, 5))
console.log('a', a) // fraction原始对象
console.log('a', a.toFraction()) // 以分数的形式打印

const b = fraction(4)
const c = add(b.div(4), 0.2)
console.log('c', c)

console.log(fraction('1/8').div('1/4'))
console.log(fraction(1))
