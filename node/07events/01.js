/**
 * events事件触发器
 * 大多数Node.js核心API构建于惯用的异步事件驱动架构，其中某些类型的对象（又称触发器，Emitter）
 * 会触发命名事件来调用函数（又称监听器，Listener）
 * 1.所有能触发事件的对象都是EventEmitter类的实例。这些对象有一个eventEmitter.on()函数，用于将一个或多个函数绑定到命名事件上。
 * 2.当EventEmitter对象触发一个事件时，所有绑定在该事件上的函数都会被同步调用。被调用的监听器返回的任何值都将会被忽略并丢弃。
 */
const EventEmitter = require('events');

class MyEmitter extends EventEmitter { }

const myEmitter = new MyEmitter();

myEmitter.on('events', () => {
  console.log('触发事件', this);
});
myEmitter.emit('events');

// 1. 将参数和 this 传给监听器
myEmitter.on('event', function (a, b) {
  console.log(a, b, this);
  /**
   * a b MyEmitter {
  _events:
   [Object: null prototype] { events: [Function], event: [Function] },
  _eventsCount: 2,
  _maxListeners: undefined }
   */

  /**
   * EventEmitter 以注册的顺序同步地调用所有监听器，这样可以确保事件的正确排序，并有助于避免静态条件和逻辑错误。
   * 当适当时，监听器函数可以使用setImmediate()和process.nextTick()方法切换到异步的操作模式
   */
  setImmediate(() => {
    console.log('异步地发生');
  });
});
myEmitter.emit('event', 'a', 'b');


/**
 * 当使用eventEmitter.on()注册监听器时，监听器会在每次触发命名事件时被调用
 */
let m = 0;
myEmitter.on('eventsM', () => {
  console.log(++m);
});
myEmitter.emit('eventsM'); // 1
myEmitter.emit('eventsM'); // 2

// 2.仅处理事件一次
/**
 * 使用eventEmitter.once()可以注册最多可调用一次的监听器。当事件被触发时，监听器会被注销，然后再调用，而且仅能被调用一次。
 */
myEmitter.once('onceEvent', () => {
  console.log(++m);
});
myEmitter.emit('onceEvent'); // 3
myEmitter.emit('onceEvent'); // 不被调用