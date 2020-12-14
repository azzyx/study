
const { SuccessModel, ErrorModel } = require('../model/resModel');
const { checkUserLogin } = require('../controller/user');
const userRouterRequest = (req, res) => {
  const method = req.method;
  const url = req.url;
  const path = url.split('?')[0];
  console.log('method', method, path)
  // 登录接口

  if (method === "POST" && path === "/api/user/login") {
    const { username, password } = req.body;
    const result = checkUserLogin(username, password);
    return result.then(userData => {
      if (userData.username) {
        return new SuccessModel();
      } else {
        return new ErrorModel('登录失败');
      }
    })
  }

}

module.exports = userRouterRequest;