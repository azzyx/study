/**
 * 02核心概念：
 */

// 01 使用普通对象描述应用的state
{
  todos: [
    {
      text: "Eat food",
      completed: true,
    },
    {
      text: "Exercise",
      completed: false,
    },
  ];
  visibilityFilter: "show_completed";
}
// 这个对象就像Modal,区别是它并没有setter（修改器方法）。因此其他的代码不能随意修改它，造成难以复现的bug。

// 如果想更新state中数据，需要发起一个action。Action就是一个普通的JavaScript对象用来描述发生了什么。
{ type: 'ADD_TODO', text: 'Go to swimming pool' }
{ type: 'TOGGLE_TODO', index: 1 }
{type: 'SET_VISIBILITY_FILTER', filter: 'SHOW_ALL'}
/**
 * 强制使用action来描述所有变化带来的好处是可以清晰的知道应用中到底发生了什么。如果一些东西改变了,
 * 就可以知道为什么变。action就像是描述发生了什么的指示器。
 * 最终为了把action和state串起来，开发一些函数，这就是reducer。
 * reducer只是一个接收state和action，并返回新的state的函数。
 * 对于大的应用，我们可以编写很多小的函数来分别管理state的一部分：
 */
function visibilityFilter(state = 'SHOW_ALL', action) {
  if(action.type === 'SET_VISIBILITY_FILTER'){
    return action.filter;
  } else {
    return false;
  }
}

function todos(state=[], action) {
  switch(action.type) {
    case 'ADD_TODO': 
      return state.concat([{text: action.text, completed: false}]);
    case 'TOGGLE_TODO':
      return state.map((todo, index) => {
        action.index === index ? {
          text: todo.text, completed: !todo.completed
          }:
        todo
      })
    default:
      return false;
  }
}

// 在开发一个reducer调用这两个reducer， 进而管理整个应用的state:
function todoApp(state={}, action) {
  return {
    todos: todos(state.todos, action),
    visibilityFilter: visibilityFilter(state.visibilityFilter, action)
  }
}

/**
 * 使用action对象来更新state，
 * 90%的代码都是纯JavaScript，没有用到Redux、Redux API和其他魔法
 */

import { combineReducers, createStore } from 'redux';
let reducer = combineReducers({visibilityFilter, todos});
let store = createStore(reducer);
