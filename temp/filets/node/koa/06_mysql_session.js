/*
 * 通过mysql来实现session的例子。后面可以参考一下redis的？
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
  maxAge: 1000*60*10, 
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
 * use了session之后，效果是：
 * session中间件会根据cookie数据，生成session信息
 * 在session模块看来，它没有用户是否登录的概念。即不管用户是否登录，程序都可以取到一个session
 * 但session id对程序屏蔽, 由程序为session绑定任意自定义数据（比如用户登录状态），并能同步到store中
 */
app.use(session({
  key: 'SESSION_ID',
  store: store,
  cookie: cookie
}))

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
    ctx.session.count = ctx.session.count + 1
    ctx.body = ctx.session
  } 
  
})

app.listen(51312, () => {
  console.log('[demo] session is starting')
})

