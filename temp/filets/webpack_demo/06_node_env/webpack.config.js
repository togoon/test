/*
 * 演示使用webpack为nodejs的程序打包
 * 好处
 * 1. 可以使用新的es语法，并且
 * 2. 最终生成一个文件
 * 3. 可以脱离 node_modules 目录，随处运行（终极优势）
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)

const js = {
  test: /\.js$/,
  loader: require.resolve('babel-loader'),
  options: {
    /*
     * 有时这些模块需要全局安装，但也要本地安装. 原因暂不明
     * 似乎跟当前项目有没有babel的配置有关？
     */
    presets : ['env', 'stage-1'],
  },
}

const rules = [js]

module.exports = {
  /*
   * 在此指定node环境
   */
  target: 'node',
  entry : d('./a.js'),
  output : {
    filename : 'out.js', 
    path : d('.'),
  },
  module : { rules, },
}

