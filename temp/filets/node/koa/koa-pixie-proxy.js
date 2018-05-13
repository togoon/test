/*
 * koa-pixie-proxy demo
 */

var Koa = require('koa');
var Router = require('koa-router')
const convert = require('koa-convert')
var pixie = require('koa-pixie-proxy');

import koaBody from 'koa-body'
import { logger } from './utils/node/koa_logger.js'

const proxy = pixie({host: 'http://localhost:4000'})

;(x=>{ // 外部服务器 foo
  var app = new Koa();
  var router = new Router();

  router.all('/foo1', function (ctx, next) { 
    ctx.body = 'foo1'
  })

  router.all('/foo2', convert(proxy('/bar2')))
  router.all('/foo3', convert(proxy('/bar3')))

  app.use( logger) // 打请求日志，在本例中该中间件要排在router的前面，因为router里有逻辑不再传递next
  app.use(router.routes())
  app.listen(3000)
  console.log("foo...")

})()

;(x=>{ // 内部服务器 bar
  var app = new Koa();
  var router = new Router();

  app.use( logger)
  router.all('/bar2', function (ctx) { // 这是koa标准的中间件接口
    ctx.body = 'bar2' + JSON.stringify(ctx.request.body, null, '  ')
  })

  router.all('/bar3', function (ctx) { // 这是koa标准的中间件接口
    ctx.body = 'bar3'
  })

  app.use(koaBody()) // 使用koaBody
  app.use(router.routes())
  app.listen(4000)
  console.log("bar...")


})()



