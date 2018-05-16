/*
 * koa-session-minimal，与koa-session类似，但为简化版
 */
process.title = 'sesMin'
const Koa = require('koa')
const session = require('koa-session-minimal')

const app = new Koa()

const cookie = { // 主要对应cookie的一些设置
  maxAge: 1000* 60, 
  // expires: '',  
  // path: '', 
  // domain: '', 
  // httpOnly: '', 
  // overwrite: '',  
  // secure: '',
  // sameSite: '',
  // signed: '',
}

/*
 * 根据客户端传来的cookie以及本端（服务端）维护的数据来判断每次请求的会话归属
 */
app.use(session({
  key: 'SESSION_ID',
  cookie: cookie,
}))

app.use( async ( ctx ) => {
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {
    console.log(ctx.session)
    ctx.session.count = (ctx.session.count||0) + 1
    ctx.body = ctx.session
  } 
})

app.listen(51312, () => {
  console.log('[demo] session is starting')
})

