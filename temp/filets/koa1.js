// koa中间件模式初探
// koa通过中间件的模式来制定http服务器的行为
// 其语义非常清晰，见下面示例代码注释：

const Koa = require('koa');
const app = new Koa();

const middles = [ // 以下都是中间件

  /*
   *
   */
  async function (ctx, next) { // 计算响应时间
    
    // 1 这是第一个中间件，首先来到这里

    const start = new Date(); // 先做一些事情

    await next(); // 

    const ms = new Date() - start;

    ctx.set('time-cost', `${ms}ms`);
  },

  async function (ctx, next) { // 打请求日志
    await next();
    console.log(`${ctx.method} ${ctx.url}`);
  },

  ctx => { // 主响应逻辑
    ctx.body = 'hey, man';
  },

]

for (let m of middles) {
  app.use(m)
}

app.listen(3000);
