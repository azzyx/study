/**
 * 04 数据流
 * 严格的单向数据流是redux架构的设计核心
 * 这意味着应用中的所有的数据都遵循相同的生命周期，
 * 这样可以让应用变得更加可预测且容易理解。
 * 同时也鼓励做数据范式化，
 * 这样可以避免使用多个且独立的无法相互引用的重复数据。
 */

/**
 * Redux应用中数据的生命周期遵循下面4个步骤：
 */

/**
 * 1.调用store.dispatch(action)
 * Action就是一个描述“发生了什么”的普通对象
 */
{type: 'LIKE_ARTICLE', articledId: 42}
{type: 'FETCH_USER_SUCCESS', response: {id: 3, name: 'Mary'}}
{type: 'ADD_TODO', text: 'Read the Redux docs'}
/**
 * 可以把action描述成新闻的摘要
 * 我们可以在任何地方调用store.dispatch(action),
 * 如：组件中、XHR会调用、甚至定时器中
 */

/**
 * 2.Redux store 调用传入的reducer函数
 * Store会把两个参数传入reducer：当前的state树和action
 * reducer是纯函数，它仅仅用于计算下一个state。
 * 它应该是完全可预测的：
 * 多次传入相同的输入必须产生相同的输出。它不应做有副作用的操作，如API调用或路由跳转。这些应该在dispatch action前发生。
 */

/**
 * 3.根reducer应该把多个reducer输出合并成一个单一的state树
 * combineReduces()
 */

/**
 * 4.Redux store保存了根reducer返回的完整state树
 * 新的根就是下一个state
 * 所有订阅store.subscribe(listener)的监听器都被调用；
 * 监听器里可以调用store.getState()获取当前state。
 * 
 */