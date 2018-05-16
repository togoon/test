/*
 * koa-session-minimal使用mysql store的例子
 * 但有一个BUG: mysql store不会自动expire
 */
const Koa = require('koa')
const session = require('koa-session-minimal')
const MysqlSession = require('koa-mysql-session')
process.title = 'mysqlSes'

const app = new Koa()

let store = new MysqlSession({
  user: 'root',
  password: '123456',
  database: 'blueprint0',
  host: '127.0.0.1',
})

let cookie = {
  maxAge: 1000* 15, 
  // expires: '',  
  // path: '', 
  // domain: '', 
  // httpOnly: '', 
  // overwrite: '',  
  // secure: '',
  // sameSite: '',
  // signed: '',
}

app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

/*
 * 以下代码与未使用store的版本完全相同
 */
app.use( async ( ctx ) => {
  // 设置session
  if ( ctx.url === '/set' ) {
    ctx.session = {
      user_id: Math.random().toString(36).substr(2),
      count: 0
    }
    ctx.body = ctx.session
  } else if ( ctx.url === '/' ) {

    // 读取session信息
    console.log(ctx.session)
    ctx.session.count = (ctx.session.count||0) + 1
    ctx.body = ctx.session
  } 
  
})

app.listen(51312, () => {
  console.log('[demo] session is starting')
})

