/*
 * webpack的配置，注意最好要使用不需要babel转换的原生node.js语法
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('./src/main.js'),
}

