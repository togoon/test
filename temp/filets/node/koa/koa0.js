// koa的最简单示例

const Koa = require('koa')
const app = new Koa()

app.use(ctx => {
  ctx.body = 'hello koa' // 一个http服务器，任何请求返回haha
})

app.listen(3001)
