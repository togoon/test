/*
 * 最简单的webpack的配置 [注意最好要使用不需要babel转换的原生node.js语法]
 *
 * 最简单的场景只需要配一个entry
 * 然后使用缺省的配置文件名：webpack.config.js，这时只需要在当前目录下执行：webpack
 * 则会生成 ./dist/[name].js
 */
const path = require('path')
const d = path.resolve.bind(null, __dirname)

module.exports = {
  entry : d('../src01/main.js'),
}

