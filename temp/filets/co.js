// var fs = require('fs');
import fs from 'fs'
import co from 'co'

var readFile = function (fileName) {
  return new Promise(function (resolve, reject) {
    fs.readFile(fileName, function(error, data) {
      if (error) reject(error);
      resolve(data);
    });
  });
}

var gen = function* () {
  /*
   * 套路: 在gen里yield出promise，然后用co来执行gen
   */
  var f1 = yield readFile('xx.js');
  var f2 = yield readFile('cfg.js');
  console.log(f1.toString());
  console.log(f2.toString());
}

co(gen).then(x => {
  console.log("haha")
})

// 这是async函数的等价用法，因此实质是async函数是co模式的语法糖
// var asyncReadFile = async function () {
//   var f1 = await readFile('xx.js');
//   var f2 = await readFile('cfg.js');
//   console.log(f1.toString());
//   console.log(f2.toString());
// }

// asyncReadFile()

