const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  console.log(`req: ${ctx.ip}`) // 获取客户端ip
  ctx.body = 'hello koa'
})

app.listen(51312, ()=>console.log('started'))
