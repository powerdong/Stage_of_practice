/*
 * @Author: Lambda
 * @Begin: 2019-10-31 07:48:53
 * @Update: 2019-10-31 09:01:03
 * @Update log: 更新日志
 */
var express = require('express');
var router = express.Router();

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')

const loginCheck = require('../middleware/loginCheck')

const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

/* GET home page. */
router.get('/list', (req, res, next) => {
  // 通过query获取到参数
  let author = req.query.author || ''
  const keyword = req.query.keyword || ''

  if (req.query.isadmin) {
    // 管理员界面
    if (req.session.username === null) {
      // 未登录
      res.json(
        new ErrorModel('未登录')
      )
      return
    }
    // 强制查询自己的博客
    author = req.session.username
  }

  // 返回一个promise对象
  const result = getList(author, keyword)
  return result.then(listData => {
    res.json(
      new SuccessModel(listData)
    )
  })
});

router.get('/detail', (req, res, next) => {
  const result = getDetail(req.query.id)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })
})

router.post('/new', loginCheck, (req, res, next) => {
  req.body.author = req.session.username
  const result = newBlog(req.body)
  return result.then(data => {
    res.json(new SuccessModel(data))
  })

})

router.post('/update', loginCheck, (req, res, next) => {
  const result = updateBlog(req.query.id, req.body)

  return result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('更新博客失败'))
    }
  })
})

router.post('/delete', loginCheck, (req, res, next) => {
  const author = req.session.username
  const result = deleteBlog(res.query.id, author)
  return result.then(val => {
    if (val) {
      res.json(new SuccessModel())
    } else {
      res.json(new ErrorModel('删除博客失败'))
    }
  })
})

module.exports = router;