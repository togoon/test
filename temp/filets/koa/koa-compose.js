/*
 * koa-compose源码解析
 * 之所以能进行中间件拼装，是因为可以在next参数上作文章:
 * 通过手动构造next参数，腾出拼装的空间，以将现有的中间件装填进去
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
         * !: next的接口与中间件的接口不一致，这里是如何处理的？
         * 事实上这里隐含了一个晦涩的逻辑：当fn为next的时候，传给fn的参数是多余的
         * 所以在这个时候，将会终止递归
         */
      }

      if (!fn) {
        return Promise.resolve()
      }

      try {
        /*
         * 这里没有使用语法糖await，而是底层的promise形式的调用
         */
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
