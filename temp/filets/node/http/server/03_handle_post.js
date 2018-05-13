/*
 * 接收post请求
 */
const http = require('http')
const qs = require('querystring')

process.title = 'httpSvr'
import readStream from './utils/node/read_stream.js'

const server = http.createServer(async (req, res)=>{
  const method = req.method
  if ( method === 'GET' ) {
    res.writeHead(200, {
      'content-type' : 'text/html; charset=utf-8',
    })
    res.end(`
      <h1>post demo</h1>
      <form method="POST" action="/">
        <p>userName</p>
        <input name="userName" /><br/>
        <p>nickName</p>
        <input name="nickName" /><br/>
        <p>email</p>
        <input name="email" /><br/>
        <button type="submit">submit</button>
      </form>
    `)
  } 
  else if ( method === 'POST' ) {
    // 读取post的数据并显示
    const data = await readStream(req)
    res.writeHead(200, {
      'content-type' : 'text/plain; charset=utf-8',
    })
    res.end(JSON.stringify(qs.parse(data.toString()), null, '  '))
  } 
})

server.listen(51312, ()=>console.log('started'))
