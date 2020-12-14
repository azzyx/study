const { exe } = require('../db/mysql');
// 1.博客列表
const getList = (author, keyword) => {
  let sql = 'select * from blogs where 1=1 ';
  if (author) {
    sql += `and author='${author}' `;
  }
  if (keyword) {
    sql += `and title like'%${keyword}%' `;
  }
  sql += 'order by createtime desc;';
  console.log('sql', sql)
  return exe(sql);
}

// 2.根据id查询博客
const getDetail = id => {
  const sql = `select * from blogs where id=${id}`;
  return exe(sql);
}

// 3.新建博客
const newBlog = (blogData = {}) => {
  const author = blogData.author;
  const createtime = Date.now();
  const title = blogData.title;
  const content = blogData.content;
  const sql = `insert into blogs (author, createtime, title, content) values (
    '${author}', '${title}', '${content}', ${createtime})`
  return exe(sql).then(insertData => {
    console.log('insertData', insertData)
    return {
      id: insertData.insertId
    }
  }).catch(err => {
    console.log('err', err)
  });
}

// 4.更新博客
const updateBlog = (id, blogData = {}) => {
  console.log('blogData', id, blogData);
  const title = blogData.title;
  const content = blogData.content;
  console.log(title, content)
  const sql = `update blogs set title='${title}', content='${content}' where id=${id}`
  return exe(sql).then(updateBlog => {
    if (updateBlog.affectedRows > 0) {
      return true;
    }
    return false;
  });
}

// 5.删除一篇博客
const delBlog = (id, author) => {
  const sql = `delete from blogs where id=${id} and author='${author}'`;
  return exe(sql).then(delData => {
    if (updateBlog.affectedRows > 0) {
      return true;
    }
    return false;
  });
}

module.exports = { getList, getDetail, newBlog, updateBlog, delBlog }