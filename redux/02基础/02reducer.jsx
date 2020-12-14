/**
 * 02 Reducer
 *    reducers指定了应用状态的变化如何响应actions并发送到store的，
 *    actions只是描述了【有事情发生了】这一事实，
 *           并没有描述应用如何更新state。
 */

// 1. 设计State结构
/**
 * 在redux应用中，所有的state都被保存在一个单一对象中。
 */
{
  visibilityFilter: 'SHOW_ALL',
  todos: [
    {
      text: 'Consider using Redux',
      completed: true
    },
    {
      text: 'Keep all state in a single tree',
      compolete: false
    }
  ]
}

// 02 Action 处理
/**
 * 现在我们已经确定了state对象的结构，就可以开始开发reducer。
 * reducer就是一个纯函数，接收旧的state和action，返回新的state。
 */
(previousState, action) => newState
/**
 * 上面的函数被称为reducer，
 * 是因为这种函数与被传入Array.prototype.reduce(reducer, ?initialValue)里的回调函数属于相同的类型。
 * 保持reducer纯净非常重要。永远不要再reducer里做这些操作：
 * 1. 修改传入参数
 * 2. 执行有副作用的操作，如API请求和路由跳转
 * 3. 调用非纯函数，如Date.now()和Math.random().
 * 
 * reducer一定要保持纯净。
 * 【只要传入参数相同，返回计算得到的下一个state就一定相同，
 *   没有特殊情况、没有副作用、没有API请求、没有变量修改、单纯执行计算】。
 */