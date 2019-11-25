/*
 * @Author: Lambda
 * @Begin: 2019-10-28 14:49:39
 * @Update: 2019-10-28 14:54:34
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

function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  redisClient.set(key, val, redis.print)
}

function get(key) {
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }

      try {
        resolve(
          JSON.parse(val)
        )
      } catch (ex) {
        resolve(val)
      }
    })
  })
  return promise
}

module.exports = {
  set,
  get
}