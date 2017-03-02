// koa中间件模式初探
// koa通过中间件的模式来制定http服务器的行为
// 中间件顺序不同，产生的效果也有一样

const Koa = require('koa');
const app = new Koa();

const middles = {
}

const timer = async function (ctx, next) { 

  console.log("进入路由")

  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('time-cost', `${ms}ms`);
}

app.use(timer);

// logger

app.use(async function (ctx, next) {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

// response

app.use(ctx => {
  ctx.body = 'Hello World';
});

app.listen(3000);
