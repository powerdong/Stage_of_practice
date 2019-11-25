/*
 * @Author: Lambda
 * @Begin: 2019-10-26 13:19:33
 * @Update: 2019-10-27 16:19:00
 * @Update log: 更新日志
 */

const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

const handleUserRouter = (req, res) => {
  const method = req.method
  const url = req.url
  const path = url.split('?')[0]

  // 登录
  if (method === 'POST' && path === '/api/user/login') {
    const {
      username,
      password
    } = req.body
    const result = login(username, password)
    return result.then(data => {
      if (data.username) {
        // 服务端设置session
        req.session.username = data.username
        req.session.realname = data.realname

        req.session

        return new SuccessModel()
      }
      return new ErrorModel('登录失败')
    })
    // if (result) {
    //   return new SuccessModel()
    // } else {
    //   return new ErrorModel('登录失败')
    // }

    // return {
    //   msg: '这是登录的接口'
    // }
  }


}

module.exports = handleUserRouter