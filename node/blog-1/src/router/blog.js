const { SuccessModel, ErrorModel } = require('../model/resModel');
const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');

const blogRouterRequest = (req, res) => {
  const method = req.method; // 请求的方法 post或者get
  const url = req.url;
  const path = url.split('?')[0];
  console.log('path----------', path);
  // 1.博客列表的接口
  if (method === 'GET' && path === "/api/blog/list") {
    const author = req.query.author || '';
    const keyword = req.query.keyword || '';
    console.log(author, keyword);
    // const listData = getList(author, keyword);
    // return new SuccessModel(listData);
    const result = getList(author, keyword);
    const list = result.then(listData => {
      return new SuccessModel(listData);
    }).catch(err => {
      console.log('err---------', err.message);
    });
    return list;
  }
  // 2.博客详情的接口
  if (method === 'GET' && path === "/api/blog/detail") {
    const id = req.query.id;
    console.log('id---------', req.query)
    const result = getDetail(id);
    return result.then(detailData => {
      return new SuccessModel(detailData);
    }).catch(err => {
      console.log('err', err);
    });
  }
  // 3.新建博客的接口
  if (method === 'POST' && path === "/api/blog/new") {
    req.body.author = "a";
    const result = newBlog(req.body);
    return result.then(data => {
      console.log('data---------', data)
      return new SuccessModel(data);
    }).catch(err => {
      console.log('err', err)
    });
  }
  // 4.更新一篇博客的接口
  if (method === 'POST' && path === "/api/blog/update") {
    const result = updateBlog(req.query.id, req.body);
    return result.then(data => {
      if (data) {
        return new SuccessModel(data);
      } else {
        return new ErrorModel('博客更新失败');
      }
    })
  }
  // 5.删除一篇博客
  if (method === 'POST' && path === "/api/blog/del") {
    req.body.author = 'a';
    const result = delBlog(req.query.id, 'a');
    return result.then(delData => {
      if (delData) {
        return new SuccessModel(delData);
      } else {
        return new ErrorModel('博客删除失败');
      }
    })
  }
}
module.exports = blogRouterRequest;