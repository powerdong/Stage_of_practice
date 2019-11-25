/*
 * @Author: Lambda
 * @Begin: 2019-10-31 08:45:33
 * @Update: 2019-10-31 08:46:39
 * @Update log: 更新日志
 */
const {
  ErrorModel
} = require('../model/resModel')

module.exports = (req, res, next) => {
  if (req.session.username) {
    next()
    return
  }

  res.json(
    new ErrorModel('未登录')
  )
}