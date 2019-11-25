/*
 * @Author: Lambda
 * @Begin: 2019-10-31 07:48:53
 * @Update: 2019-10-31 08:19:18
 * @Update log: 更新日志
 */
var express = require('express');
var router = express.Router();
const {
  login
} = require('../controller/user')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')


/* GET users listing. */
router.post('/login', function (req, res, next) {
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

      res.json(new SuccessModel())
    }
    res.json(new ErrorModel('登录失败'))
  })
});

// 测试session
// router.get('/session-test', (req, res, next) => {
//   const session = req.session
//   if (session.viewNum == null) {
//     session.viewNum = 0
//   }
//   session.viewNum++

//   res.json({
//     viewNum: session.viewNum
//   })
// })

module.exports = router;