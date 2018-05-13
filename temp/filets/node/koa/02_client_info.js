const Koa = require('koa')
const app = new Koa()
process.title = 'httpSvr'
app.use(ctx => {
  // 获取客户端信息
  console.log(`==============================
  ip: ${ctx.ip}
  host: ${ctx.host}
  protocol: ${ctx.protocol}
  querystring: ${ctx.querystring}
  `)
  console.log(ctx.header === ctx.headers)
  console.log(ctx.header === ctx.request.headers)
  console.log(ctx.header === ctx.request.header)
  console.log(ctx.request.headers)
  ctx.body = ctx.query
})

app.listen(51312, ()=>console.log('started'))
