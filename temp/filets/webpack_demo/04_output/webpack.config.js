/*
 * 使用html plugin，省掉手动创建一个没有什么作用的html占位置
 */
const path = require('path')
const Html = require('html-webpack-plugin')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../src01/main.js'),
  /*
   * 如果整个output都缺省，filename取为[name].js
   *  path则为d(process.cwd(),'dist')，即'./dist'
   * 如果指定了filename（filename里包含的目录会忽略），缺省path
   *  path则为当前目录
   */
  output : { // <url:https://webpack.js.org/configuration/output/>
    filename : '[name].js', 
    path : d('./dist'), // 必须为绝对路径
  },
  plugins : [ new Html() ],
}

