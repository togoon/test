var readlineSync = require('readline-sync');
 
// 等待用户输入
var userName = readlineSync.question('May I have your name? ');
console.log('Hi ' + userName + '!');
 
// 模拟输入密码的形式，用*代替输入字符
var favFood = readlineSync.question('What is your favorite food? ', {
  hideEchoBack: true // The typed text on screen is hidden by `*` (default). 
});
console.log('Oh, ' + userName + ' loves ' + favFood + '!');

