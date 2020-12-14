const mysql = require('mysql');

// 1.创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',
  port: '3306',
  database: 'myblog'
});

// 2.开始连接
con.connect();

// 3.执行sql语句
const sql = 'select * from users';
con.query(sql, (err, result) => {
  if (err) {
    console.log('err', err);
    return;
  }
  console.log('result', result);
  return result;
});

// 4.关闭连接
con.end();

// node index.js 报错

/**
 * err Error: ER_ACCESS_DENIED_ERROR: Access denied for user 'root'@'localhost' (using password: YES)
    at Handshake.Sequence._packetToError
 *
 workbench 中执行以下代码
 // yourpassword  数据库的代码
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yourpassword';
flush privileges;
*/
