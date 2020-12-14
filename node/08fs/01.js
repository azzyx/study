/**
 * 08 fs模块提供了用于与文件系统进行交互的API
 */

const fs = require('fs');

/**
 * 1.所有的文件系统操作都具有同步和异步的形式。
 * 1.1异步的形式总是把完成回调作为其最后一个参数。传给完成回调的参数取决于具体方法，但第一个参数总是预留给异常。
 * 如果操作被成功完成，则第一个参数会为null或者undefined
 */
// fs.unlink('文件.txt', err => {
//   if (err) throw err;
//   console.log('已成功删除文件');
// })

/**
 * 1.2 当使用同步的操作时，发生的异常会被立即抛出，可以使用try...catch处理，也可以冒泡。
 */
// try {
//   fs.unlinkSync('文件');
//   console.log('已成功删除文件');
// } catch (err) {
//   throw err;
// }

/**
 * 2.文件路径
 * 字符串形式的路径会被解析为UTF-8字符序列（标识绝对或相对的文件名）。
 * 相对路径会相对于当前工作目录（由process.cwd()指定）进行处理。
 */

console.log('process.cwd()', process.cwd()); // F:\study-node\08fs
fs.open('./文件.txt', 'r', (err, fd) => {
  if (err) throw err;
  fs.close(fd, (err) => {
    console.log('fd', fd);
    if (err) throw err;
  })
})

/**
 * 3.URL对象的支持
 * 
 */