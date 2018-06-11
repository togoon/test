/*
 * 用于测试ajax的后端服务
 */
const Koa = require('koa')
const app = new Koa()

import {para} from './utils/node/koa_para.js'
process.title = 'ajaxBackend'

app.use(async (ctx, next)=>{
  const {method, ip, url} = ctx
  await next()
  console.log(`============${method} ${url} [${ip}] [${ctx.status}]===============\n`)
})

app.use(para)
app.use(ctx => {
  const {url, method, para} = ctx
  ctx.body = {
    url, method,
    para,
  }
})

app.listen(51312, ()=>{
  console.log('listening on 51312')
})
