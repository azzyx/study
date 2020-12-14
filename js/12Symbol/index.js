/**
 * 1.概述
 * 保证每个属性的名字都是独一无二的
 * Symbol就是独一无二的
 * 它是js的第七种数据类型
 * 前六种：undefined、null、boolean、number、string、object
 * 
 * Symbol值通过Symbol函数生成，属性名现在有两种，一种是原来的字符串，一种是新增的Symbol类型。
 */
let s = Symbol();
console.log('s', typeof s);
/**
 * 注意：Symbol函数前不能使用new命令，
 * 因为生成的Symbol是一个原始类型的值，不是对象。
 * Symbol值不是对象，所以不能添加属性
 */
// 1.1Symbol值是唯一的
let s1 = Symbol('foo');
let s2 = Symbol('foo');
console.log(s1 === s2); // false
// 1.2Symbol值不能与其他类型的值进行运算，会报错。
let sym = Symbol('My Symbol');
// 'your symbol is' + sym; // TypeError: Cannot convert a Symbol value to a string

// 属性名的遍历
/**
 * Symbol作为属性名，遍历对象的时候，该属性不会出现在for...in、for...of循环中，
 * 也不会被Object.keys()、Object.getOwnPropertyNames()、Object.stringify()返回。
 */

console.log(Array.prototype[Symbol.unscopables]);
