/*
 * 使用html plugin，省掉手动创建一个没有什么作用的html占位置
 */
const path = require('path')
const Html = require('html-webpack-plugin')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../src01/main.js'),
  plugins : [ new Html() ],
}

