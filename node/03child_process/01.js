/**
 * 03 child_process
 * child_process模块提供了衍生子进程的能力，此功能主要是由child_process.spawn()函数提供
 * child_process.fork()衍生一个新的node.js进程，并调用一个指定的模块
 */
const cp = require('child_process');
const { spawn, exec, execFile } = require('child_process');
const util = require('util');
const child = execFile('node', ['--version'], (err, stdout, stderr) => {
  if (err) {
    throw err;
  }
  console.log('stdout---------------', stdout); // v10.16.3
})
// console.log('child-------------', child);
// console.log('util', util);
const ps = spawn('ps', ['ax']);
console.log('ps-------------', ps);
const bat = spawn('cmd.exe', ['/c', 'my.bat']);

// bat.stdout.on('data', (data) => {
//   console.log(data.toString());
// });

// bat.stderr.on('data', (data) => {
//   console.error(data.toString());
// });

// bat.on('exit', (code) => {
//   console.log(`子进程退出，退出码 ${code}`);
// });

const n = cp.fork(`${__dirname}/sub.js`);
console.log('n----------------', n);
n.on('message', (m) => {
  console.log('父进程收到消息', m);
});
