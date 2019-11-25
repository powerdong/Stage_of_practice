/*
 * @Author: Lambda
 * @Begin: 2019-10-27 14:04:28
 * @Update: 2019-10-31 11:21:32
 * @Update log: 更新日志
 */
const env = process.env.NODE_ENV // 环境参数（在package.json中的scripts中定义不同的环境变量）

let MYSQL_CONF
let REDIS_CONF

if (env === 'dev') {
  // 开发
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '990608lhd',
    port: '3306',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}

if (env === 'production') {
  // 线上
  MYSQL_CONF = {
    host: 'localhost',
    user: 'root',
    password: '990608lhd',
    port: '3306',
    database: 'myblog'
  }

  REDIS_CONF = {
    port: 6379,
    host: '127.0.0.1'
  }
}


module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}