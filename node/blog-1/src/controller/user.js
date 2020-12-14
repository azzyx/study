const { exe } = require('../db/mysql');
const checkUserLogin = (username, password) => {
  const sql = `select username  realname from users where username='${username}' and 'password'=${password}`;
  const result = exe(sql);
  return result.then(rows => {
    return rows[0] || {}
  }).catch(err => {
    console.log('err', err);
  })
}

module.exports = {
  checkUserLogin
}