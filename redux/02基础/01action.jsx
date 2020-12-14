/**
 * 01 Action
 *  Action是把数据从应用（这里之所以不叫view是因为这些数据有可能是服务器响应、
 *                       用户输入或其他非view的数据）传到store的有效载荷。
 * 它是store数据的【唯一】来源，一般来说你会通过store.dispatch()将action传到store。
 */

 // eg1：添加新todo任务的action是这样的：
 const ADD_TODO = 'ADD_TODO';
 {
   type: ADD_TODO,
   text: 'Build my first Redux app'
 }

 /**
  * Action本质上是javaScript普通对象。
  * 我们约定action内必须使用一个字符串类型的  type 字段来表示将要执行的动作。
  * 多数情况下，type会被定义成字符串常量。
  * 当应用规模越来越大时，建议使用单独的模块或文件来存放action。
  */
 import { ADD_TODO, REMOVE_TODO } from '../actionTypes';
 /**
  * 除了 type字段外，action对象的结构根据业务需要来决定。
  */

/**
 * action.js
 */
// action 类型
export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITER_FILTER'

// 其他常量
export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: "SHOW_ACTIVE"
}

// action 创建函数
export function addTodo(text) {
  return {type: ADD_TODO, text}
}
export function toggleTodo(index) {
  return {type: TOGGLE_TODO, index}
}
export function setVisibilityFilter(filter) {
  return {type: SET_VISIBILITY_FILTER,  filter}
}
