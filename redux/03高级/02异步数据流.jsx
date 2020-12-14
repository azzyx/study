/**
 * 02 异步数据流
 */
/**
 * 默认情况下，createSotre()所创建的Redux store没有使用middleware，所以只支持同步数据流。
 * 
 * redux-thunk或redux-promise这样支持异步的middleware都包装了store的dispatch()方法，
 * 以此来让我们dispatch一些除了action以外的其他内容，
 */