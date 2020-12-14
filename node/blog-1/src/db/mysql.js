const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF);

// 连接数据库
con.connect();

// 统一执行数据库
function exe(sql) {
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return false;
      }
      resolve(result);
    })
  })
  return promise;
}

module.exports = {
  exe
}