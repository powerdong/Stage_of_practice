/*
 * @Author: Lambda
 * @Begin: 2019-10-24 15:14:00
 * @Update: 2019-10-24 15:28:20
 * @Update log: nodeJs 处理POST请求
 */
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    // req 数据格式
    console.log('req content-type: ', req.headers['content-type']);
    // 接收数据
    let postData = ''
    req.on('data', chunk => {
      postData += chunk.toString()
    })
    req.on('end', () => {
      console.log('postData: ', postData);
      res.end('hello world !')
    })
  }
})

server.listen(8000)
console.log('http://localhost:8000');