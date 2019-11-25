/*
 * @Author: Lambda
 * @Begin: 2019-10-31 09:29:54
 * @Update: 2019-10-31 09:56:50
 * @Update log: 更新日志
 */
const http = require('http')
const slice = Array.prototype.slice

class LikeExpress {
  constructor() {
    // 存放中间件列表
    this.routes = {
      all: [], // app.user(...)
      get: [], // app.get(...)
      post: [] // app.post(...)
    }
  }

  /**
   * 分析我的第一个参数是不是路由
   * @param {*} path 路由地址
   */
  register(path) {
    const info = {}
    /**
     * 当使用 app.use() 第一个没有使用路由，直接是中间件的话
     * 我们把它看成为根路由
     */
    if (typeof path === 'string') {
      info.path = path
      // 从第二个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 1)

    } else {
      info.path = '/'
      // 从第一个参数开始，转换为数组，存入 stack
      info.stack = slice.call(arguments, 0)
    }
    return info
  }

  /**
   * app.use()
   */
  use() {
    const info = this.register.apply(this, arguments)
    this.routes.all.push(info)
  }

  /**
   * app.get()
   */
  get() {
    const info = this.register.apply(this, arguments)
    this.routes.get.push(info)
  }

  /**
   * app.post()
   */
  post() {
    const info = this.register.apply(this, arguments)
    this.routes.post.push(info)
  }

  /**
   * 通过请求方法和路由地址匹配有用的中间件
   * @param {*} method 
   * @param {*} url 
   */
  match(method, url) {
    let stack = []
    if (url === '/favicon.ico') {
      // 忽略
      return stack
    }

    // 获取 routes
    let curRoutes = []
    curRoutes = curRoutes.concat(this.routes.all)
    curRoutes = curRoutes.concat(this.routes[method])

    curRoutes.forEach(routeInfo => {
      if (url.indexOf(routeInfo.path) === 0) {
        // 如果当前 url === '/api/get/-cookie' 且 routerInfo.path === '/'
        // 如果当前 url === '/api/get/-cookie' 且 routerInfo.path === '/api'
        // 如果当前 url === '/api/get/-cookie' 且 routerInfo.path === '/api/get/-cookie'
        stack = stack.concat(routeInfo.stack)
      }
    })

    return stack
  }

  /**
   * 核心的 next 机制
   * @param {*} req 
   * @param {*} res 
   * @param {*} stack 
   */
  handle(req, res, stack) {
    const next = () => {
      // 拿到第一个匹配的中间件
      const middleware = stack.shift()
      if (middleware) {
        // 执行中间件函数
        middleware(req, res, next)
      }
    }
    next()
  }

  /**
   * listen 的 callback
   */
  callback() {
    return (req, res) => {
      // res.json() 函数定义
      res.json = (data) => {
        res.setHeader('Content-type', 'application/json')
        res.end(
          JSON.stringify(data)
        )
      }
      const url = req.url
      const method = req.method.toLowerCase()

      const resultList = this.match(method, url)
      this.handle(req, res, resultList)
    }
  }


  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

// 工厂函数
module.exports = () => {
  return new LikeExpress
}