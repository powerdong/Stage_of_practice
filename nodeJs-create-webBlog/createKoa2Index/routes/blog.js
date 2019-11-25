/*
 * @Author: Lambda
 * @Begin: 2019-10-31 10:49:46
 * @Update: 2019-11-01 20:13:32
 * @Update log: 更新日志
 */
const router = require('koa-router')()


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

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
  const query = ctx.query
  ctx.body = {
    errno: 0,
    query,
    data: ['列表']
  }
})

/* GET home page. */
router.get('/list', async function (ctx, next) {
  // 通过query获取到参数
  let author = ctx.query.author || ''
  const keyword = ctx.query.keyword || ''

  if (ctx.query.isadmin) {
    // 管理员界面
    if (ctx.session.username === null) {
      // 未登录
      ctx.body = new ErrorModel('未登录')
      return
    }
    // 强制查询自己的博客
    author = ctx.session.username
  }

  const listData = await getList(author, keyword)
  ctx.body = new SuccessModel(listData)
});

router.get('/detail', async function (ctx, next) {
  const data = await getDetail(ctx.query.id)
  ctx.body = new SuccessModel(data)
})

router.post('/new', loginCheck, async function (ctx, next) {
  ctx.request.body.author = ctx.session.username
  const data = await newBlog(ctx.request.body)
  ctx.body = new SuccessModel(data)
})

router.post('/update', loginCheck, async function (ctx, next) {
  const val = await updateBlog(ctx.query.id, ctx.request.body)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('更新博客失败')
  }
})

router.post('/delete', loginCheck, async function (ctx, next) {
  const author = ctx.session.username
  const val = await deleteBlog(ctx.query.id, author)
  if (val) {
    ctx.body = new SuccessModel()
  } else {
    ctx.body = new ErrorModel('删除博客失败')
  }
})

module.exports = router