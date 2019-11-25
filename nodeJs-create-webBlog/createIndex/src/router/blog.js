/*
 * @Author: Lambda
 * @Begin: 2019-10-26 13:19:29
 * @Update: 2019-10-28 15:54:30
 * @Update log: 更新日志
 */

const {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  deleteBlog
} = require('../controller/blog')
const {
  SuccessModel,
  ErrorModel
} = require('../model/resModel')

// 统一的登录验证
const loginCheck = req => {
  if (!req.session.username) {
    return Promise.resolve(
      new ErrorModel('尚未登录')
    )
  }
}


const handleBlogRouter = (req, res) => {
  // 获取请求方法
  const method = req.method
  // 获取id参数属性
  const id = req.query.id
  // 获取请求的url地址
  const url = req.url
  // 获取路由
  const path = url.split('?')[0]

  // 获取博客列表
  if (method === 'GET' && path === '/api/blog/list') {
    // 通过query获取到参数
    const author = req.query.author || ''
    const keyword = req.query.keyword || ''
    // 返回一个promise对象
    const result = getList(author, keyword)
    return result.then(listData => {
      return new SuccessModel(listData)
    })

    // // 通过getList方法会返回一个数组，里边是返回的数据
    // const listData = getList(author, keyword)
    // // 创建一个成功的模型
    // return new SuccessModel(listData)

    // return {
    //   msg: '这是获取博客列表的接口'
    // }
  }

  // 获取博客详情
  if (method === 'GET' && path === '/api/blog/detail') {
    const result = getDetail(id)
    return result.then(data => {
      return new SuccessModel(data)
    })

    // const data = getDetail(id)
    // return new SuccessModel(data)

    // return {
    //   msg: '这是获取博客详情的接口'
    // }
  }

  // 新建一篇博客
  if (method === 'POST' && path === '/api/blog/new') {


    // 假数据，待开发登陆时再改成真数据

    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 当有返回值的时候说明未登录
      return loginCheckResult
    }
    req.body.author = req.session.username
    const result = newBlog(req.body)
    return result.then(data => {
      return new SuccessModel(data)
    })

    // const blogData = req.body
    // const data = newBlog(blogData)
    // return new SuccessModel(data)
    // return {
    //   msg: '这是新建博客的接口'
    // }
  }

  // 更新一篇博客
  if (method === 'POST' && path === '/api/blog/update') {
    const result = updateBlog(id, req.body)
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 当有返回值的时候说明未登录
      return loginCheckResult
    }

    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('更新博客失败')
      }
    })
    // return {
    //   msg: '这是更新博客的接口'
    // }
  }

  // 删除一篇博客
  if (method === 'POST' && path === '/api/blog/delete') {
    // 假数据，待开发登陆时再改成真数据
    const loginCheckResult = loginCheck(req)
    if (loginCheckResult) {
      // 当有返回值的时候说明未登录
      return loginCheckResult
    }
    const author = req.session.username
    const result = deleteBlog(id, author)
    return result.then(val => {
      if (val) {
        return new SuccessModel()
      } else {
        return new ErrorModel('删除博客失败')
      }
    })

    // return {
    //   msg: '这是删除博客的接口'
    // }
  }
}

module.exports = handleBlogRouter