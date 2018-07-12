const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const open = require('opener')
const fs = require('fs-extra')
const app = new Koa()

process.title = 'koaStatic'
const d = path.resolve.bind(null, __dirname)

import {ptimeout} from './utils/modash.js'

// 静态资源目录对于相对入口文件index.js的路径
const staticPath = './static'

app.use(async (ctx, next)=>{
  if ( ctx.url == '/a.js' ) {
    // await ptimeout(4000)
    ctx.body = 'var myname = "haha"'
  } 
  else if ( ctx.url.endsWith('.png') ) {
    await ptimeout(4000)
    ctx.body = fs.readFileSync(d('./static' + ctx.url ))
  } 
  else {
    await next()
  }
})

app.use(serve(
  path.join( __dirname,  staticPath), {maxage:1000*60}
))

app.listen(51312, () => {
  console.log('serving at 51312')
  open(`http://localhost:51312`)
})

