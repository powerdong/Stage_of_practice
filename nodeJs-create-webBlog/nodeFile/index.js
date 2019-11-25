/*
 * @Author: Lambda
 * @Begin: 2019-10-28 16:32:59
 * @Update: 2019-10-28 16:51:36
 * @Update log: 更新日志
 */
const fs = require('fs')
const path = require('path')

// 当前目录下的data.txt文件
const fileName = path.resolve(__dirname, 'data.txt')

// 读取文件内容
// fs.readFile(fileName, (err, val) => {
//   if (err) {
//     console.log(err)
//     return
//   }
//   // data 是二进制的类型，需要转换为字符串
//   console.log(val.toString());
// })

// 写文件

const content = '这是新写入的内容\n'
const opt = {
  flag: 'a' // 追加写入，覆盖用 ‘w'
}

fs.writeFile(fileName, content, opt, err => {
  if (err) {
    console.log(err);
  }
})