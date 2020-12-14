/**
 * 01. Action 
 * 当调用一步API时，有两个非常关键的时刻，发起请求的时刻，和接收到响应的时刻（也可能是超时）
 * 这两个时刻都可能会更改应用的state；为此，我们需要dispatch普通的同步action。
 * 一般情况下，每个API请求都需要至少三种action：
 * 1.一种通知reducer请求开始的action。
 *   对于这种action，reducer可能会切换一下state中的isFetching标记。以此来告诉UI来显示加载界面。
 * 2.一种通知reducer请求成功的action。
 *   对于这种action，reducer可能会把接收到的新数据合并到state中，并重置isFetching。UI则会隐藏加载界面，并显示接收到的数据。
 * 3.一种通知reducer请求失败的action。
 *   对于这种action，reducer可能会重置isFetching。另外有些reducer会保存这些失败信息，并在UI里显示出来。
 * 
 * 为了区分这三种action，可以在action里添加一个专门的status字段作为标记位：
 */
{ type: 'FETCH_POSTS' }
{type: 'FETCH_POSTS', status: 'error', error: 'Oops'}
{type: 'FETCH_POSTS', status: 'success', response: {name: 'lili'}}

/**
 * 又或者为他们定义不同的type
 */
{type: 'FETCH_POSTS_REQUEST'}
{type: 'FETCH_POSTS_FAILURE', error: 'Oops'}
{type: 'FETCH_POSTS_SUCCESS', response: {name: 'lili'}}

/**
 * 02. 创建同步Action函数（Action Creator）
 */

/**
 * 03. 设计state结构
 */

/**
 * 04. 处理Action
 */

/**
 * 05. 异步action创建函数
 */