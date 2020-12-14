/** 04 cluster
 * 单个Node.js实例运行在单个线程中。为了充分利用多核系统，有时需要启用一组Node.js进程去处理负载任务。
 * cluster模块可以创建共享服务器端口的子进程
 * 工作进程是由child_process.fork()创建的
 */
const cluster = require('cluster');
const numCUPs = require('os').cpus().length;
const http = require('http');
const process = require('process');
// console.log('process', process);

// console.log('cluster', cluster);
/**
 * EventEmitter {
  _events: [Object: null prototype] {},
  _eventsCount: 0,
  _maxListeners: undefined,
  isWorker: false,
  isMaster: true,
  Worker:
   { [Function: Worker]
     super_:
      { [Function: EventEmitter]
        once: [Function: once],
        EventEmitter: [Circular],
        usingDomains: false,
        defaultMaxListeners: [Getter/Setter],
        init: [Function],
        listenerCount: [Function] } },
  workers: {},
  settings: {},
  SCHED_NONE: 1,
  SCHED_RR: 2,
  schedulingPolicy: 1,
  setupMaster: [Function],
  fork: [Function],
  disconnect: [Function] }
 */
// 衍生工作进程
if (cluster.isMaster) {
  console.log(`主进程${process.pid}正在进行`);
  // 衍生工作进程
  // console.log("require('os').cpus()", require('os').cpus());
  /**
   * [ { model: 'Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz',
    speed: 3292,
    times:
     { user: 424322, nice: 0, sys: 343155, idle: 19798539, irq: 46535 } },
  { model: 'Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz',
    speed: 3292,
    times:
     { user: 462667, nice: 0, sys: 321455, idle: 19781441, irq: 2964 } },
  { model: 'Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz',
    speed: 3292,
    times:
     { user: 545473, nice: 0, sys: 654907, idle: 19365059, irq: 3260 } },
  { model: 'Intel(R) Core(TM) i5-4590 CPU @ 3.30GHz',
    speed: 3292,
    times:
     { user: 529997, nice: 0, sys: 345136, idle: 19690181, irq: 2293 } } ]
   */
  console.log('主进程----cluster.workers', cluster.workers);
  for (let i = 0; i < numCUPs; i++) {
    cluster.fork();
    const worker = cluster.fork();
    worker.send('你好');
    console.log('子进程----cluster.worker', cluster.worker);
  }
  cluster.on('exit', (worker, code, singnal) => {
    console.log(`工作进程${worker.process.pid}已成功退出`);
  })
} else {
  console.log(`这是工作进程 #${cluster.worker.id}`);
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world');
  }).listen(8000);
  console.log(`工作进程${process.pid}已经启动`);
}