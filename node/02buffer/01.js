/**
 * 02 buffer
 * buffer 对象用于以字节序列的形式来表示二进制数据
 *  Buffer 类时JavaScript语言内置的Unit8Array 类的子类。支持许多涵盖其他用例的额外的用法 
 */
const { Buffer } = require('buffer');

// 创建一个长度为10的buffer
const buf1 = Buffer.alloc(10);
console.log('buf1', buf1); // buf1 <Buffer 00 00 00 00 00 00 00 00 00 00>

// 创建一个长度为10、且用0x1填充的buffer
const buf2 = Buffer.alloc(10, 1);
console.log('buf2', buf2); // buf2 <Buffer 01 01 01 01 01 01 01 01 01 01>

const buf3 = Buffer.allocUnsafe(10);
console.log('buf3', buf3); // buf3 <Buffer a8 c3 50 02 00 00 00 00 18 c4>

const buf4 = Buffer.from([1, 2, 3]);
console.log('buf4', buf4); // buf4 <Buffer 01 02 03>
for (const b of buf4) {
    console.log(b); // 1 2 3
}
const buf5 = Buffer.from([257, 257.5, -255, '1']);
console.log('buf5', buf5); // buf5 <Buffer 01 01 01 01>

const buf6 = Buffer.from('tést');
console.log('buf6', buf6); // buf6 <Buffer 74 c3 a9 73 74>

const buf7 = Buffer.from('tést', 'latin1');
console.log('buf7', buf7); // buf7 <Buffer 74 e9 73 74>

const arr = new Uint16Array(20);
const bufArr = Buffer.from(arr.buffer, 0, 16);
console.log('bufArr', bufArr); // bufArr <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00>