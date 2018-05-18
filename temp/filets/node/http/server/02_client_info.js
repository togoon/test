/*
 * http服务器获取请求端的信息
 */
process.title = 'httpSvr'
const http = require('http')
require('colors')

const svr = http.createServer( (req, res) => {
  const {socket:{remoteAddress, remotePort, remoteFamily}, url, method, headers} = req
  console.log(`=========[${method}] ${url} from [${remoteAddress}:${remotePort} ${remoteFamily}]==============`.green)
  console.log(headers)

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`
method: ${method}
  `);
})

svr.listen(51312, ()=>{
  console.log(`server started on `, svr.address())
})
