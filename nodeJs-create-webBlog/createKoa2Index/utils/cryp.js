/*
 * @Author: Lambda
 * @Begin: 2019-10-30 16:01:18
 * @Update: 2019-10-30 16:59:34
 * @Update log: 更新日志
 */
const crypto = require('crypto')

// 密钥
const SECRET_KEY = 'Lambda_068#'

// MD5 加密
function md5(content) {
  let md5 = crypto.createHash('md5')
  return md5.update(content).digest('hex')
}

// 加密函数
function genPassword(password) {
  const str = `password=${password}&key=${SECRET_KEY}`
  return md5(str)
}

module.exports = {
  genPassword
}