/*
 * @Author: Lambda
 * @Begin: 2019-10-26 14:55:40
 * @Update: 2019-10-30 15:27:27
 * @Update log: 更新日志
 */

const {
  exec,
  escape
} = require('../db/mysql')

const {
  genPassword
} = require('../utils/cryp')

const login = (username, password) => {
  username = escape(username)

  // 生成加密密码
  password = genPassword(password)
  password = escape(password)

  const sql = `
    select username, realname from users where username=${username} and password=${password}
  `

  return exec(sql).then(rows => {
    return rows[0] || {}
  })

  // // 先试用假数据
  // if (username === 'zhangsan' && password === '123') {
  //   return true
  // }
  // return false
}

module.exports = {
  login
}