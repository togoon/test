/*
 * 人肉请求使用gzip压缩的http服务器并人肉解压缩的例子
 * 注：该代码由需要服务器才能正常运行，因此仅供参考
 */
var rp = require('request-promise')
const zlib = require('zlib')
const http = require('http')
const fs = require('fs')

var opt = { // 这是node原生http客户端要求的参数
  hostname: 'localhost',
  port: 8080,
  path: '/load_mart',
  method: 'GET',
  // url: 'http://localhost:8080/load_mart',
  headers: { 
    host: 'localhost:8084',
    connection: 'keep-alive',
    pragma: 'no-cache',
    'cache-control': 'no-cache',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36',
    accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'accept-encoding': 'gzip, deflate, sdch, br',
    'accept-language': 'zh-CN,zh;q=0.8,en;q=0.6' 
  },
}

/*
 * 使用原生的http客户端api请求支持gzip的服务
 */
const req = http.request(opt, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
})

req.on('response', (response) => {

  switch (response.headers['content-encoding']) {
    // or, just use zlib.createUnzip() to handle both cases
    case 'gzip':
      response.pipe(zlib.createGunzip()).pipe(process.stdout);
      break;
    case 'deflate':
      response.pipe(zlib.createInflate()).pipe(output);
      break;
    default:
      response.pipe(output);
      break;
  }
})

req.end()
