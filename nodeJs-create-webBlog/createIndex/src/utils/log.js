/*
 * @Author: Lambda
 * @Begin: 2019-10-28 17:22:42
 * @Update: 2019-10-28 18:33:18
 * @Update log: 更新日志
 */
const fs = require('fs');
const path = require('path');


/**
 * 写日志
 * @param {*} writeStream 写的文件 
 * @param {*} log log 日志
 */
function writeLog(writeStream, log) {
  writeStream.write(log + '\n') // 关键代码
}

/**
 * 创建一个Stream流
 * @param {*} fileName 文件名 
 */
function createWriteStream(fileName) {
  // 找到目标文件
  const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
  const writeStrem = fs.createWriteStream(fullFileName, {
    flags: 'a'
  })
  return writeStrem
}

/**
 * 写访问日志
 * @param {*} log log 内容
 */
const accessWriteStream = createWriteStream('access.log')

function access(log) {
  writeLog(accessWriteStream, log)
}

module.exports = {
  access
}