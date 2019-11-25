/*
 * @Author: Lambda
 * @Begin: 2019-10-31 08:25:42
 * @Update: 2019-10-31 08:26:32
 * @Update log: 更新日志
 */
const redis = require('redis')

const {
  REDIS_CONF
} = require('../conf/db')

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.prot, REDIS_CONF.host)
redisClient.on('error', err => {
  console.error(err)
})


module.exports = redisClient