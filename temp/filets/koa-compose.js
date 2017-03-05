/*
 * koa-compose源码解析
 */
import Koa from 'koa'
import koaBody from 'koa-body'

function compose (middleware) { // 中间件数组

  return function (context, next) {
    let index = -1

    return dispatch(0)

    function dispatch (i) { // 递归，i为起点参数
      if (i <= index) { 
        return Promise.reject(new Error('next() called multiple times'))
      }

      index = i
      let fn = middleware[i] // 取到当前的中间件
      if (i === middleware.length) { // 如果到尽头
        fn = next // 是时候接棒next
        /*
         * 疑问：next的接口与中间件的接口不一致，这里是如何处理的？
         */
      }

      if (!fn) {
        return Promise.resolve()
      }

      try {

        return Promise.resolve(fn(context, function() {
          return dispatch(i + 1)
        }))
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}

const app = new Koa();
const middles = [ 

  /*
   * 使用compose合并三个中间件
   */
  compose([ 
    async function(ctx, next){
      ctx.params = ctx.query
      await next()
    }, 
    koaBody(), 
    async function(ctx, next){
      console.log(ctx.params)
      if ( ctx.method === 'POST' ) {
        ctx.params = {...ctx.params, ...ctx.request.body}
      } 
      await next()
    }
  ]),

  async function (ctx, next) { // 打请求日志
    await next();
    console.log(`${ctx.method} ${ctx.url}`);
  },

  ctx => { 
    ctx.body = JSON.stringify(ctx.params, null, '  ')
  },

]

for (let m of middles) {
  app.use(m)
}

app.listen(3000);
console.log("begin...")
