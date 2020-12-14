/**
 * crypto模块提供了加密功能，包括对OpenSSL的hash、HMAC】加密、解密、签名已经验证功能的一整套封装
 */
const crypto = require('crypto');
const serect = 'adsasn';
const hash = crypto.createHash('sha256', serect).update('I love cupcakes').digest('hex');
console.log('hash', hash); // hash d9f31f76f97e8ee1165ce7031c99d62e8b50f19649a20775300cc9fe706ba816
