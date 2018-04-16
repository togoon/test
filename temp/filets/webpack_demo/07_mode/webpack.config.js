/*
 * 演示webpack的mode选项
 * 可以比较便捷地进行编译环境的区分
 * 更复杂的场景，可以使用webpack自带的EnvironmentPlugin <url:https://webpack.js.org/plugins/environment-plugin/>
 * 或者是DefinePlugin <url:https://webpack.js.org/plugins/define-plugin/>
 */
const Html = require('html-webpack-plugin')

module.exports = {
  entry : './main.js',
  /* 
   * 如果缺省，将为production，并且会收到webpack的警告
   * 前端可以通过process.env.NODE_ENV得到相应的值
   */
  mode : 'development',
  plugins : [
    new Html(),
  ],
}

