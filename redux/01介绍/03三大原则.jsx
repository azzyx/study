/**
 * 03三大原则
 */

/**
 * 1.单一数据源
 *   整个应用的state被存储在一颗object tree中，
 *   并且这个object tree只存在于唯一一个store中。
 *   来自服务端的state可以在无需编写更多代码的情况下被序列化并注入到客户端中。
 *   由于是单一的state tree，调试也变得非常容易，在开发中，可以把应用的state保存在本地，从而加快开发速度。
 *   此外，受益于单一的state tree，以前难以实现的“撤销/重做”这类功能也变得轻而易举。
 */

/**
 * 2 State是只读的
 * 唯一改变state的方法就是触发action，action是一个用于描述已发生事件的普通对象
 *
 * 这样确保了视图和网络请求都不能直接修改state，相反它们只能表达想要修改的意图。
 * 因为所有的修改都被集中化处理，且严格按照一个接一个的顺序执行。
 * Action就是普通对象，因此它们可以被日志序列化打印、序列化、储存、后期调试或测试时回放出来。
 */
store.dispatch({
  type: "COMPLETE_TODO",
  index: 1,
});

store.dispatch({
  type: "SET_VISIBILITY_FILITER",
  filter: "SHOW_COMPLETED",
});

/**
 * 3 使用纯函数来执行修改
 *
 * 为了描述action如何改变state tree, 我们需要编写【reducers】
 * Reducer只是一些纯函数，它接收先前的state和action，并返回新的state。
 * 刚开始的时候可以只有个reducer，随着应用的变大，可以把它拆成多个小的reducers，
 * 分别独立地操作state tree的不同部分，因为reducer只是函数，
 * 我们可以控制它们被调用的顺序，传入附加数据。甚至编写可复用的reducer来处理一些通用任务。
 */
