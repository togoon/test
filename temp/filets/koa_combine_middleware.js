/*
 * 手动合并中间件的例子
 */
import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa();
const koa_body = koaBody()

const middles = [ 

  /*
   * 这里实现了一个新的中间件，该中间件koa-body中间件进行包装（对接）
   */
  async function (ctx, next) {
    ctx.params = ctx.query
    
    /*
     * 注意这里对接中间件的方式：
     * 将koa-body的next参数传入一个自写的函数
     * 在该函数里使用其处理的结果，并且接上原本的next
     */
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
