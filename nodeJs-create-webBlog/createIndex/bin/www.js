/*
 * @Author: Lambda
 * @Begin: 2019-10-26 13:12:19
 * @Update: 2019-10-26 13:35:08
 * @Update log: 更新日志
 */
const http = require('http')

const PORT = 8000
const serverHandle = require('../app')

const server = http.createServer(serverHandle)
server.listen(PORT)
console.log('http://localhost:8000');