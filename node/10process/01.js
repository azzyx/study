/**
 * process 对象是一个全局变量，提供了有关当前Node.js进程的信息，并对其进行控制。
 * 作为全局变量，它始终可供Node.js应用程序使用，它始终可供Node.js应用程序使用，
 * 无需使用require()。也可以显式地访问
 */
const process = require('process');

/**
 * 进程事件
 * process对象是EventEmitter事件。
 */
console.log('process', process);
console.log('---------------------------------------------');
process.on('beforeExit', (code) => {
  console.log('进程beforeExit事件的代码', code);
});

process.on('exit', code => {
  console.log('进程exit事件的代码', code);
});

console.log('此消息为最新消息');
console.log(process.env.TEST);