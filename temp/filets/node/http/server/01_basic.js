/*
 * node原生的httt服务器世界观
 * 与Go有细微的区别，node将其拆成了两步：
 * 1. 创建服务器对象。只需提供一个handler(req, res)
 * 2. 提供服务
 *
 * 但本质上没有区别，都是两个核心概念：handler主入口定义，提供服务
 */
process.title = 'httpSvr'
const http = require('http')

const svr = http.createServer( (req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('okay');
})

// 由系统自动分配端口，该模式可用于测试的场景
svr.listen(()=>{
  console.log(`server started on `, svr.address())
})

/*
 * 或者: 
  svr.listen(8080, ()=>{
    ...
  })
 */


