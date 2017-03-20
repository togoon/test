/*
 * koa-proxy demo
 */
var Koa = require('koa');
var Router = require('koa-router')
const convert = require('koa-convert')
var proxy = require('koa-proxy')
import koaBody from 'koa-body'

const logger = async function (ctx, next) { 
  await next();
  console.log(`${ctx.method} ${ctx.url}`);
}

;(x=>{ // 外部服务器 foo
  var app = new Koa();
  var router = new Router();

  router.all('/foo1', function (ctx, next) { 
    ctx.body = 'foo1'
  })

  router.all('/foo2', convert(proxy({  
    host: 'http://localhost:4000',
    map: {
      '/foo2': '/bar2'
    }}
  )))

  router.all('/foo3', convert(proxy({
    url: 'http://localhost:4000/bar3'
  })))

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



