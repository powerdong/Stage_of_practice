/*
 * @Author: Lambda
 * @Begin: 2019-10-26 14:55:40
 * @Update: 2019-10-31 11:28:56
 * @Update log: 更新日志
 */

const {
  exec,
  escape
} = require('../db/mysql')

const {
  genPassword
} = require('../utils/cryp')

const login = async (username, password) => {
  username = escape(username)

  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  const sql = `
    select username, realname from users where username=${username} and password=${password}
  `

  const rows = await exec(sql)
  return rows[0] || {}
}

module.exports = {
  login
}