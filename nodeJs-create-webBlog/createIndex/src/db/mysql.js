/*
 * @Author: Lambda
 * @Begin: 2019-10-27 14:09:16
 * @Update: 2019-10-27 14:14:28
 * @Update log: 更新日志
 */
const mysql = require('mysql')

const {
  MYSQL_CONF
} = require('../conf/db')

// 创建连接对象
const con = mysql.createConnection(MYSQL_CONF)

// 开始连接
con.connect()

// 统一执行 sql 的函数
function exec(sql) {
  // 使用promise
  const promise = new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
        return
      }
      resolve(result)
    })
  })

  return promise
}

module.exports = {
  exec,
  escape: mysql.escape
}