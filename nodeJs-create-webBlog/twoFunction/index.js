/*
 * @Author: Lambda
 * @Begin: 2019-10-24 15:28:35
 * @Update: 2019-10-24 15:39:32
 * @Update log: 更新日志
 */
const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  // 请求方法
  const method = req.method
  // 请求地址
  const url = req.url
  // 请求路径路由
  const path = url.split('?')[0]
  // 发送的数据
  const query = querystring.parse(url.split('?')[1])

  // 设置返回格式为 JSON
  res.setHeader('Content-type', 'application/json')

  // 返回的数据
  const resData = {
    method,
    url,
    path,
    query
  }

  // 返回
  if (method === 'GET') {
    res.end(
      JSON.stringify(resData)
    )
  }

  if (method === 'POST') {
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      resData.postData = postData

      res.end(
        JSON.stringify(resData)
      )
    })
  }
})

server.listen(8000)
console.log('http://localhost:8000');