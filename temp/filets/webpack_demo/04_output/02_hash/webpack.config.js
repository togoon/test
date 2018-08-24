/*
 * 用hash来命名
 */
const path = require('path')
const Html = require('html-webpack-plugin')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../a.js'),
  output : { 
    filename : '[name].[hash].js', 
    path : d('../dist'),
  },
  plugins : [ new Html() ],
}

