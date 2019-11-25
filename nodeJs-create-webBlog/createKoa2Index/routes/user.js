/*
 * @Author: Lambda
 * @Begin: 2019-10-31 10:49:52
 * @Update: 2019-11-01 20:12:28
 * @Update log: 更新日志
 */
const router = require('koa-router')()
const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {
  const {
    username,
    password
  } = ctx.request.body
  const data = await login(username, password)
  if (data.username) {
    // 服务端设置session
    ctx.session.username = data.username
    ctx.session.realname = data.realname

    ctx.body = new SuccessModel()
    return
  }
  ctx.body = new ErrorModel('登录失败')
})

module.exports = router