/*
 * @Author: Lambda
 * @Begin: 2019-10-27 13:45:32
 * @Update: 2019-10-27 13:52:56
 * @Update log: 更新日志
 */
const mysql = require('mysql')

// 创建连接对象
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '990608lhd',
  port: '3306',
  database: 'myblog'
})

// 开始连接
con.connect()

// 执行 sql 语句
const sql = 'update users set realname="李四" where username = "lisi";'
con.query(sql, (err, result) => {
  if (err) {
    console.log(err);
    return
  }
  console.log(result)
})


// 关闭连接
con.end()