const querystring = require('querystring');
const { blogRouter, userRouter, SuccessModel, ErrorModel } = require('./src/index');

// 处理post data
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST' || req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = '';
    req.on('data', chunk => {
      postData += chunk.toString();
      console.log('chunk----------', chunk, postData)
    })
    req.on('end', () => {
      console.log('postData------------', typeof postData)
      if (!postData) {
        return;
      }
      resolve(JSON.parse(postData));
    });
  })
  return promise;
}
const serverHandle = (req, res) => {
  // 设置返回格式 JSON
  res.setHeader('Content-type', "application/json");

  // 获取path
  const url = req.url;
  req.path = url.split('?')[0];
  const path = url.split('?')[1];

  // 解析path
  req.query = querystring.parse(path);

  // 处理 post data
  getPostData(req).then((postData) => {
    req.body = postData;
    // 处理 blog的路由
    // const blogData = blogRouter(req, res);
    // if (blogData) {
    //   res.end(JSON.stringify(blogData));
    //   return;
    // }
    const blogResult = blogRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      }).catch(err => {
        console.log('err', err);
      })
      return;
    }
    // 处理 user的路由
    const userResult = userRouter(req, res);
    return userResult.then(userData => {
      if (userData) {
        res.end(JSON.stringify(userData));
        return;
      }
    }).catch(err => {
      console.log('err', err)
    })

    // 未命中路由
    res.writeHead(404, { 'Content-type': "text/plain" });
    res.write("404 Not Found\n");
    res.end();
  })
}
module.exports = serverHandle;