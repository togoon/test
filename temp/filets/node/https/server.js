/*
 * 自建证书的生成的方法：打开gitbash
 * $ openssl genrsa -out key.pem
 * $ openssl req -new -key key.pem -out csr.pem  #一路回车即可
 * $ openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
 * $ rm csr.pem
 * 参见阮一峰的文章 <url:http://javascript.ruanyifeng.com/nodejs/http.html#toc10>
 */
var https = require('https');
var fs = require('fs');

process.title = 'https'

var options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const port = 51312

var a = https.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end("hello world\n");
}).listen(51312, ()=>{
  console.log(`listening at 51312`)
});
