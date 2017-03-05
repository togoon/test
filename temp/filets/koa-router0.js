// koa-router的笔记
/*
 * koa-router的世界观
 * 1、路由器提供路由方法，对接其他中间件
 * 2、路由器生成中间件接口，对接koa
 */

var Koa = require('koa');
var Router = require('koa-router');

var app = new Koa();
var router = new Router();

// 路由方法
router.get('/test', function (ctx, next) { // 这是koa标准的中间件接口
  ctx.body = 'router!'
})

/*
 * router本身不作为中间件，其routes()方法才作为中间件接口
 */
app.use(router.routes())
app.listen(3000)


