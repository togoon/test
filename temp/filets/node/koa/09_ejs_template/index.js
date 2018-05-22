const Koa = require('koa')
const views = require('koa-views')
const path = require('path')
const app = new Koa()
const d = path.resolve.bind(null, __dirname)
process.title = 'koa'

/*
 * views中间件并不直接服务客户端. 只是给ctx赋予了render方法
 */
app.use(views(d('./view'), {
  extension: 'ejs'
}))

app.use( async ( ctx ) => {
  /*
   * 在随后的中间件（路由中），调用koa-views生成的render方法，渲染出页面
   */
  await ctx.render('index', {
    title: 'hello koa',
  })
})

app.listen(51312, ()=>{
  console.log('[demo] ejs is starting')
})

