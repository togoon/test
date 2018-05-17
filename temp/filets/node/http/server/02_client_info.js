/*
 * http服务器获取请求端的信息
 */
process.title = 'httpSvr'
const http = require('http')

const svr = http.createServer( (req, res) => {
  const {socket:{remoteAddress, remotePort, remoteFamily}, method, headers} = req
  console.log(`[${method}] from [${remoteAddress}:${remotePort} ${remoteFamily}]`, headers)

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end(`
method: ${method}
  `);
})

svr.listen(51312, ()=>{
  console.log(`server started on `, svr.address())
})

/*

svr.listen(()=>{
  console.log(`server started on `, svr.address())
})

 * 或者: 
  svr.listen(8080, ()=>{
    ...
  })
 */


