/*
 * 使用html plugin，省掉手动创建一个没有什么作用的html占位置
 */
const path = require('path')
const Html = require('html-webpack-plugin')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../a.js'),
  /*
   * filename缺省为[name].js, 指定filename时，不能包含路径
   * path缺省为d(process.cwd(),'dist')，即'./dist'
   */
  output : { // <url:https://webpack.js.org/configuration/output/>
    filename : '[name].js', // 对于只有一个文件的entry，[name]值为main
    path : d('../dist'), // 必须为绝对路径
  },
  plugins : [ new Html() ],
}

