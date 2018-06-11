/*
 * 演示node里Buffer的使用
 */

// 写入一个字符串
// buf.write(string[, offset[, length]][, encoding])  // 返回写入字节的长度

// 写入整型
// buf.writeUInt8(value, offset[, noAssert]) 等等一系列

// 空buffer
;(()=>{
  const buf = Buffer.from('') // 如果这里传()的话，会抛异常
  console.log('buf.length', buf.length)
})()

// 如何判断一个对象是buffer
;(()=>{
  const buf = Buffer.from('')
  console.log(buf instanceof Buffer)
})()

// buffer的长度与字符串的长度的区别
;(()=>{
  /*
   * buffer的单位永远是一个字节，而字符串的单位是一个字符，而对于中文，一个字符会占多个字节
   */
  const buf = Buffer.allocUnsafe(256);
  // len为写入的buffer的长度
  const len = buf.write('\u00bd + \u00bc = \u00be'); // 实际字符串为：½ + ¼ = ¾，不指定编码的话默认为utf8
  const str = buf.toString('utf8',0, len) // 重新转回string
  // buffer的长度为12，而字符串的长度为9
  console.log(`${len} bytes: ${str}, strlen: ${str.length}`); 
})()
