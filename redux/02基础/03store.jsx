/**
 * 03 Store
 *  使用action描述“发生了什么”，
 *  使用reducers来根据action更新state的用法
 *  Store就是把它们联系到一起的对象。
 */

/**
 * Store有以下五个职责：
 * 
 * 1.维持应用的state；
 * 2.提供getState()方法获取state；
 * 3.提供dispatch(action)方法更新state；
 * 4.通过subscribe(listener)注册监听；
 * 5.通过subscribe(listener)返回的函数注销监听器
 * 
 */

/**
 * Rdedux 应用只有一个单一的store,
 * 当需要拆分数据处理逻辑时，
 * 应该使用reducer组合而不是创建多个store。
 */