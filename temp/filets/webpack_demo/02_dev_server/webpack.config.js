/*
 * devServer的例子，同时增加一些简单的配置
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../src01/main.js'),
  devServer : {
    contentBase: d('./dist')
  }
}

