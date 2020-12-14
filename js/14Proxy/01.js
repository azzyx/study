/**
 * Proxy
 */
var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log('getting', target, propKey, receiver);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}`);
    return Reflect.set(target, propKey, value, receiver)
  }
});
obj.count = 1;
++obj.count;
console.log(obj);

var proxy = new Proxy({}, {
  get: function (target, propKey) {
    return 35;
  }
});
console.log(proxy.time);

var handler = {
  get: function (target, name) {
    if (name == 'prototype') {
      return Object.prototype;
    }
    return 'Hello, ' + name;
  },
  apply: function (target, thisBinding, args) {
    return args[0]
  },
  constructor: function (target, args) {
    console.log('argsargsargs', args);
    return { value: args[1] };
  },
};
var fproxy = new Proxy(function (x, y) {
  return x + y;
}, handler);
console.log(fproxy(1, 2));
console.log('argsargsargs', new fproxy(1, 2));
console.log(fproxy.prototype === Object.prototype);
console.log(fproxy.foo === 'Hello, foo');

/**
 * Proxy实例方法
 */
/**
 * 1.get()
 * get方法用于拦截某个属性的读取操作，可以接受三个参数，
 * 依次为目标对象、属性名和proxy实例本身（严格地说，是操作行为所针对的对象），
 * 其中最后一个参数可选。
 */

/**
 *2.set()
 set方法用来拦截某个属性的赋值操作，可以接受四个参数，
 依次为目标对象，属性名，属性值和proxy实例本身，其中最后一个参数可选。
 */

/**
 * 3.apply()
 * apply方法拦截函数的调用、call和apply操作。
 * 分别是目标对象、目标对象的上下文对象（this）和目标对象的参数数组。
 */

/**
 * 4.has()
 * has方法用来拦截HasProperty操作，即判断对象是否具有某个属性时，这个方法会生效。
 * 典型的操作就是in运算符。
 * 接受两个参数，分别是目标对象，需查询的属性名。
 */

/**
 * 5.constructor()
 * 用于拦截new命令
 * 可以接受三个参数：目标对象，构造函数的参数数组，创造实例对象时，new命令作用的构造函数，
 * 方法返回的必须是一个对象，否则会报错。
 */