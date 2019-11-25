/*
 * @Author: Lambda
 * @Begin: 2019-10-26 12:59:06
 * @Update: 2019-10-28 18:36:58
 * @Update log: 更新日志
 */
const querystring = require('querystring')
const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')
const {
  access
} = require('./src/utils/log');

// session 数据
const SESSION_DATA = {}
/**
 * 用于处理 post data
 * @param {*} req 
 */
const getPostData = req => {
  const promise = new Promise((resolve, reject) => {
    if (req.method !== 'POST') {
      resolve({})
      return
    }
    if (req.headers['content-type'] !== 'application/json') {
      resolve({})
      return
    }
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      if (!postData) {
        resolve({})
        return
      }
      resolve(
        JSON.parse(postData)
      )
    })
  })

  return promise
}

/**
 * 获取 cookie 的过期时间
 */
const getCookieExpires = () => {
  // 获取当前时间
  const d = new Date()
  // 设置 d 的时间为当前时间加上 24小时的毫秒数
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
  return d.toGMTString()
}

const serverHandle = (req, res) => {
  // 记录 access log
  // 方法 -- 地址 -- 浏览器的特性 -- 当前时间
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`)


  // 设置返回格式 JSON
  res.setHeader('Content-type', 'application/json')
  const url = req.url

  // 解析到query 请求所带的参数
  req.query = querystring.parse(url.split('?')[1])

  // 解析 cookie
  req.cookie = {} // 用来存储cookie
  const cookieStr = req.headers.cookie || ''
  cookieStr.split(';').forEach(item => {
    if (!item) {
      return
    }
    const arr = item.split('=')
    const key = arr[0].trim()
    const val = arr[1].trim()
    req.cookie[key] = val
  });

  // 解析 session
  let needSetCookie = false
  // 尝试曲cookie中获取userId
  let userId = req.cookie.userid
  if (userId) {
    // 如果已经有userId这个信息了
    if (SESSION_DATA[userId]) {
      // 就赋值到req.session里面来
      req.session = SESSION_DATA[userId]
    } else {
      needSetCookie = true
      // 没有的话先将对应的数据初始化为空对象
      SESSION_DATA[userId] = {}
      // 再赋值过来
      req.session = SESSION_DATA[userId]
    }
  } else {
    userId = `${Date.now()}_${Math.random()}`
    // 没有的话先将对应的数据初始化为空对象
    SESSION_DATA[userId] = {}
    // 再赋值过来
    req.session = SESSION_DATA[userId]
  }


  /**
   * 处理 post data
   */
  getPostData(req).then(postData => {
    // 获取到post Data
    req.body = postData

    // 处理 blog 路由
    const blogResult = handleBlogRouter(req, res)
    if (blogResult) {
      blogResult.then(blogData => {

        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(
          JSON.stringify(blogData)
        )
      })
      return
    }
    // const blogData = handleBlogRouter(req, res)
    // if (blogData) {
    //   res.end(
    //     JSON.stringify(blogData)
    //   )
    //   return
    // }

    // 处理 user 路由
    const userResult = handleUserRouter(req, res)
    if (userResult) {
      userResult.then(userData => {
        if (needSetCookie) {
          res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
        }

        res.end(
          JSON.stringify(userData)
        )
      })
      return
    }
    // if (userData) {
    //   res.end(
    //     JSON.stringify(userData)
    //   )
    //   return
    // }

    // 未命中路由  返回404
    res.writeHead(404, {
      "Content-type": "text/plain"
    })
    // 这个是在页面上反应的显示效果
    res.write('404 Not Found\n')
    res.end()
  })

}

// process.env.NODE_ENV
module.exports = serverHandle