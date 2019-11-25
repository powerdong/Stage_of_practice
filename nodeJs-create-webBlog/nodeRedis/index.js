/*
 * @Author: Lambda
 * @Begin: 2019-10-28 14:32:18
 * @Update: 2019-10-28 14:44:23
 * @Update log: 更新日志
 */
const redis = require('redis')

// 创建客户端
const redisClient = redis.createClient(6379, '127.0.0.1')
// 监听错误
redisClient.on('error', err => {
  console.error(err)
})

// 存储值
redisClient.set('myname', 'lambda', redis.print)
redisClient.get('myname', (err, val) => {
  if (err) {
    console.error(err)
  }
  console.log('val is: ', val);

})