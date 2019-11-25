/*
 * @Author: Lambda
 * @Begin: 2019-11-01 20:31:02
 * @Update: 2019-11-01 20:42:19
 * @Update log: 更新日志
 */
const http = require('http')


/**
 * 组合中间件
 * @param {*} middlewareList 中间件列表 
 */
function compose(middlewareList) {
  return function (ctx) {
    // 中间件调用
    function dispatch(i) {
      const fn = middlewareList(i)
      try {
        return Promise.resolve(
          // 实现 next
          fn(ctx, dispatch.bind(null, i + 1))
        )
      } catch (error) {
        return Promise.reject(error)
      }
    }
    return dispatch(0)
  }
}

class LikeKoa2 {
  constructor() {
    // 中间件
    this.middlewareList = []
  }

  use(fn) {
    this.middlewareList.push(fn)
    return this
  }

  handleRequest(ctx, fn) {
    return fn(ctx)
  }

  createContext(req, res) {
    // 组合 req， res
    const ctx = {
      req,
      res
    }
    ctx.query = req.query
    return ctx
  }

  callback() {
    const fn = compose(this.middlewareList)
    return (req, res) => {
      const ctx = this.createContext(req, res)
      return this.handleRequest(ctx, fn)
    }
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    server.listen(...args)
  }
}

module.exports = LikeKoa2