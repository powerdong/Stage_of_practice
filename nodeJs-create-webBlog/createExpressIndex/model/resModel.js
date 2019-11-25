/*
 * @Author: Lambda
 * @Begin: 2019-10-26 13:40:21
 * @Update: 2019-10-26 14:45:28
 * @Update log: 更新日志
 */
class BaseModel {
  constructor(data, message) {
    if (typeof data === 'string') {
      this.message = data
      data = null
      message = null
    }
    if (data) {
      this.data = data
    }
    if (message) {
      this.message = message
    }
  }
}

class SuccessModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 200
  }
}

class ErrorModel extends BaseModel {
  constructor(data, message) {
    super(data, message)
    this.code = 301
  }
}

module.exports = {
  SuccessModel,
  ErrorModel
}