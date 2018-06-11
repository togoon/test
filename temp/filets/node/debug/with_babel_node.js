/*
 * 如果用babel-node来执行本程序，将看不到debug的输出，原因不明
 */
process.env.debug = 'main*'

const log = require('debug')('main');
log('hello world')

console.log('done')
