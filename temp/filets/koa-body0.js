/*
 * koa-body的用法
 */
import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa();

/*
 * 使用koa-body中间件，如此简单
 * 这里的缺省配置已经能应对多数情况
 */
app.use(koaBody()) 
app.use(ctx => {

  /* 
   * 经过koa-body中间件的处理，将可以获取得到post的参数body对象，在ctx.request.body当中
   * 文档说ctx.req.body似乎是不对的
   */
  console.log(ctx.request.body) 
  ctx.body = JSON.stringify(ctx.request.body, null, '  ')
});

app.listen(3000);
