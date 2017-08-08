// 一个koa的post echo示例

const Koa = require('koa')
const streamToPromise = require('stream-to-promise')

const app = new Koa();

app.use(async ctx => {

  const {req} = ctx

  // 使用了stream to promise，可以保存流结束之后，再执行下面的的动作
  const preq = streamToPromise(req)

  let data = ''
  req.on('data', x=>{
    data += x // 复制post的过来的数据
  })

  // 等待流完成
  await preq

  ctx.body = data
});

app.listen(3001);
