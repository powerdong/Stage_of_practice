/*
 * @Author: Lambda
 * @Begin: 2019-10-24 14:52:53
 * @Update: 2019-10-24 15:01:32
 * @Update log: 更新日志
 */
// node 处理get 请求

const http = require('http')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  console.log('method', req.method); // GET
  const url = req.url // 获取请求的完整url
  console.log('url', req.url);
  req.query = querystring.parse(url.split('?')[1]) // 解析 querystring
  console.log('query:', req.query);

  res.end(JSON.stringify(req.query)) // 将 querystring 返回

})

server.listen(8000)

console.log('http://localhost:8000');