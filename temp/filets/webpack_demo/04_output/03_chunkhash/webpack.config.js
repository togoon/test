/*
 * 针对每个文件都对应不同的hash
 */
const path = require('path')
const Html = require('html-webpack-plugin')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../a.js'),
  output : { 
    filename : '[name].[chunkhash].js', 
    path : d('../dist'),
  },
  plugins : [ new Html() ],
}

