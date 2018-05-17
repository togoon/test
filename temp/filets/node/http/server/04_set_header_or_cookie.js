/*
 * 演示设置http头
 */
process.title = 'httpSvr'
const http = require('http')

const svr = http.createServer( (req, res) => {
  res.setHeader('Set-Cookie', ['a', 'b'])
  res.setHeader('Set-Cookie', ['a=bb; Max-Age=0', 'c=d']) // 本条语句会完全覆盖上一条
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
})

svr.listen(51312, ()=>{
  console.log(`server started on `, svr.address())
})
