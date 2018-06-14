/*
 * 好像这个conditional跟etag跟相像中不一样
 * 如果改了静态文件，要重启服务才能生效啊
 */
const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const etag = require('koa-etag')
const app = new Koa()
const conditional = require('koa-conditional-get')

const d = path.resolve.bind(null, __dirname)

process.title = 'conditionalGet'

app.use(async (ctx, next)=>{
  await next()
  console.log(`===========${ctx.url} ${ctx.method} ${ctx.status} ${ctx.fresh}=========`)
})
app.use(conditional())
app.use(etag())

app.use(serve(d('./static')))

app.listen(51312, () => {
  console.log('serve on 51312')
})

