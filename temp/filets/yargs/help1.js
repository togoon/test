/*
 * help稍微复杂一点点的用法:
 * 增加一些参数的说明
 */

const argv = require('yargs')
  .help()
  .alias('f', 'file')
  .describe('f', 'force') // 这里只是影响帮助信息的显示，f这个参数如何使用并没有设置，将启用yargs的缺省行为
  .argv 

console.log(argv)
