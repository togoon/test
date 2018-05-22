/*
 * 服务端支持CORS的例子
 */
process.title = 'httpSvr'
const http = require('http')
require('colors')

const svr = http.createServer( (req, res) => {
  const {socket:{remoteAddress, remotePort, remoteFamily}, url, method, headers} = req
  console.log(`=========[${method}] ${url} from [${remoteAddress}:${remotePort} ${remoteFamily}]==============`.green)
  console.log(headers)

  /*
   * 以下服务端回的header，虽然会因为浏览器是否传了cookie（credentials），是简单请求还是复杂请求的情况导致严格性的要求有所差异
   * 但建议尽量严格对待
   *
   * 这里其实应该严格填上请求的origin. 用意是表示请求的origin联已阅 
   * 如果浏览器端传了credentials(cookie)，则不能用*
   */
  res.setHeader('Access-Control-Allow-Origin', headers.origin || '*')
  /*
   * 应该填上请求的自定义headers，原因同上
   */
  res.setHeader('Access-Control-Allow-Headers', headers['access-control-request-headers'] || '*')
  res.setHeader('Access-Control-Allow-Credentials', true)

  res.writeHead(200, {'Content-Type': 'text/plain'})
  res.end(`
method: ${method}
  `);
})

svr.listen(51312, ()=>{
  console.log(`server started on `, svr.address())
})
