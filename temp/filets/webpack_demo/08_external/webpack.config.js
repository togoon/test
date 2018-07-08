/*
 * 演示external
 */
const Html = require('html-webpack-plugin')

module.exports = {
  entry : './a.js',
  mode : 'development',
  plugins : [
    new Html(),
  ],
  externals : {
    lodash : '_',
  }
}

