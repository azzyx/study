const http = require('http');
const queryString = require('querystring');

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const query = url.split('?')[0];
  const userInfo = url.split('?')[1];
  res.setHeader('content-type', 'application/json');
  const resData = {
    method,
    url,
    query,
    userInfo,
    env: process.env.NODE_ENV
  }
  // post 请求
  if (req.method === 'POST') {
    // 接收数据
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
    })
    req.on('end', () => {
      console.log('postData', postData);
      res.end(JSON.stringify(resData))
    })
  }
  // get 请求
  if (method === 'GET') {
    res.end(JSON.stringify(resData))
  }
  res.end('hello world');
})
server.listen(8000);
console.log('OK')