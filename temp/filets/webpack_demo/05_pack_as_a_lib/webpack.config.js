const path = require('path')
const d = path.resolve.bind(null, __dirname)

const react_rule = {
  test: /\.(js|jsx)$/,
  loader: require.resolve('babel-loader'),
  options: {
    presets : ['react'],
  },
}

const rules = [react_rule]

module.exports = {
  entry : d('./a.js'),
  output : {
    filename : 'lib.js', 
    path : d('.'),
    /*
     * 通过指定libraryTarget，可以导出为一个库供其他代码工程使用
     * 用于将一个有目录结构的代码工程打包为一个代码。
     * 有利于lib的封装以及代码保护
     */
    libraryTarget : 'commonjs',
  },
  module : { rules, },
}

