/*
 * @Author: Lambda
 * @Begin: 2019-10-31 08:45:33
 * @Update: 2019-10-31 11:30:21
 * @Update log: 更新日志
 */
const {
  ErrorModel
} = require('../model/resModel')

module.exports = async (ctx, next) => {
  if (ctx.session.username) {
    await next()
    return
  }

  ctx.body = new ErrorModel('未登录')
}