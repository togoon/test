/*
 * 演示如何与客户端（主要指浏览器进行缓存的协商）
 */
process.title = 'koa'
const Koa = require('koa')
const logger = require('koa-logger')
const moment = require('moment')
const app = new Koa()
import {ptimeout} from './utils/modash.js'

app.use(logger())
app.use(async ctx => {
  await ptimeout(2000)
  ctx.set({
    // 'cache-control' : 'max-age=10',
    'last-modified' : Date(),
  })
  ctx.body = `const a = 'hello: ${moment().format('HH:mm:ss')}'`
})

const port = 51312
app.listen(port, ()=>console.log(`serve at ${port}`))
