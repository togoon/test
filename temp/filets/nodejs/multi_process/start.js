/*
 * 演示如何在node.js里进行多进程（多服务）的管理
 */
import {exec as _exec} from 'shelljs'
import {promisify} from './utils/modash.js'

const exec = promisify((ok, err, ...para)=>_exec(...para, ok))

;(async ()=>{

  /*
   * 这里同时起两个进程（通常是两个常驻的服务）
   * 一旦有任何一个进程退出（通常代表其中一个服务停止）
   * 整个主进程就退出，这样有利于容器的管理
   */
  await Promise.race([
    exec('babel-node _count.js a 5'), // 这里的脚本可以放到npm scripts里去
    exec('babel-node _count.js b 10'),
  ])

  process.exit(1)

})()



