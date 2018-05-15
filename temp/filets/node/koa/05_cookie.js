/*
 * 操作cookie示例
 */
const Koa = require('koa')
const app = new Koa()
process.title = 'httpSvr'

app.use( async ( ctx ) => {
  if ( ctx.url === '/index' ) {
    ctx.cookies.set(
      'cid', 
      'haha',
      {
        // domain: 'localhost', 
        // path: '/index',       
        maxAge: 2 * 60 * 1000, // 两分钟的cookie
        // expires: new Date('2017-02-15'),
        // httpOnly: false, 
        // overwrite: false  // 暂时不知道用处
      }
    )
    ctx.body = 'cookie is ok'
  } else {
    console.log(`======== ${ctx.path} ======\ncookies:`, ctx.header.cookie)
    ctx.body = 'hello world' 
  }
})

app.listen(51312, () => {
  console.log('[demo] cookie is starting')
})
