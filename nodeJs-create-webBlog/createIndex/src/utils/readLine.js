/*
 * @Author: Lambda
 * @Begin: 2019-10-30 15:06:23
 * @Update: 2019-10-30 15:12:05
 * @Update log: 更新日志
 */
const fs = require('fs')
const path = require('path')
const readline = require('readline')

// 文件名
const fileName = path.join(__dirname, '../', '../', 'logs', 'access.log')

// 创建 read Stream
const readStream = fs.createReadStream(fileName)

// 创建 readLine 对象
const readLine = readline.createInterface({
  input: readStream
})

let chromeNum = 0
let sum = 0

// 逐行读取
readLine.on('line', (lineData) => {
  if (!lineData) {
    return
  }

  // 记录总行数
  sum++


  const arr = lineData.split(' -- ')
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chromeNum++
  }
})

readLine.on('close', () => {
  console.log(chromeNum / sum);

})