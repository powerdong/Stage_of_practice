/*
 * @Author: Lambda
 * @Begin: 2019-10-30 17:16:41
 * @Update: 2019-10-31 09:18:01
 * @Update log: 更新日志
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')
// 这里注意写法！！！
const RedisStore = require('connect-redis')(session)

var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');


const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境
  app.use(logger('dev'));
} else {
  // 线上环境
  const logFileName = path.join(__dirname, 'logs', 'access.log')
  // 将日志写入文件
  const writeStream = fs.createWriteStream(logFileName, {
    flags: 'a'
  })
  // 第一个参数控制不同格式的输出
  app.use(logger('combined', {
    stream: writeStream
  }));
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

/**
 * 将 session 放在 redis 中
 */
const redisClient = require('./db/redis')
const sessionStore = new RedisStore({
  client: redisClient
})

app.use(session({
  // 密匙
  secret: 'Lambda_990608#',
  cookie: {
    path: '/', // 默认配置
    httpOnly: true, // 默认配置
    maxAge: 24 * 60 * 60 * 1000
  },
  // 将 session 放在 redis 存储中
  store: sessionStore
}))

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);
// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;