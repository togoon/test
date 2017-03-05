/*
 * 手动合并中间件的例子
 */
import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa();
const koa_body = koaBody()

const middles = [ 

  async function (ctx, next) {
    ctx.params = ctx.query
    
    // 对接koa body
    await koa_body(ctx, async x=>{
      ctx.params = { ...ctx.params, ...ctx.request.body }
      await next()
    })
  },

  async function (ctx, next) { // 打请求日志
    await next();
    console.log(`${ctx.method} ${ctx.url}`);
  },

  ctx => { 
    ctx.body = JSON.stringify(ctx.params, null, '  ')
  },

]

for (let m of middles) {
  app.use(m)
}

app.listen(3000);
console.log("begin...")
