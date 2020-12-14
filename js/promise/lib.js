(function (window) {
  let PENDING = 'pending';
  let RESOVED = 'resolved';
  let REJECTED = 'rejected';

  /**
   * Promise 构造函数
   */
  function Promise(exector) {
    let self = this;
    self.status = PENDING; // 状态 给promise对象指定status属性，初始值为pending
    self.data = '';        // 数据 给对象指定一个用于存储结果数据的属性
    self.callBacks = [];    // 异步执行时，将状态存储起来。每个元素的结构 {onResolved() {}, onRejected() {}}
    // 成功
    // resolve(1);
    function resolve(value) {
      if (self.status !== PENDING) { return }
      // 改变status状态
      self.status = RESOVED;
      // 保存value数据
      self.data = value;
      // console.log(value);

      // 如果是异步执行，将回调放到队列中
      if (self.callBacks.length) {
        setTimeout(() => {
          self.callBacks.forEach(callBacksObj => {
            callBacksObj.onResolved(value);
          })
        }, 1000)
      }
      return value;
    }
    // 失败
    // reject(2);
    function reject(reason) {
      if (self.status !== PENDING) { return }
      // 改变status的值
      self.status = REJECTED;
      // 存储reason的值
      self.data = reason;
      if (self.callBacks.length) {
        setTimeout(() => {
          self.callBacks.forEach(callBacksObj => {
            callBacksObj.onRejected(reason);
          })
        }, 1000);
      }
      return reason;
    }
    try {
      // 执行器 同步执行
      exector(resolve, reject);
    } catch (error) { // 如果执行器抛出异常，Promise对象变为rejected状态
      reject(error);
    }
  }

  /**
   * Promise 原型对象的then()
   * 指定成功和失败的回调函数
   * 返回新的Promise对象
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    // 1.接收的值不是Promise
    // 2.接收的值是Promise
  }

  Promise.prototype.catch = function (onRejected) {

  }

  /**
   * Promise 函数对象的resolve方法
   * @param {*} value 
   */
  Promise.resolve = value => value;

  /**
   * Promise 函数对象的reject方法
   * @param {*} reason 
   */
  Promise.reject = reason => reason;

  /**
   * Promise 函数对象的all方法
   * @param {*} promises 
   */
  Promise.all = function (promises) {

  }

  /**
   * Promise 函数对象的race方法
   * @param {*} promises 
   */
  Promise.race = function (promises) {

  }

  // 向外暴漏Promise函数
  window.Promise = Promise;
})(window)