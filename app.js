// 引入各模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const consola = require('consola')

// 跨域问题
const cors = require('cors')

// 引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var menusRouter = require('./routes/menus');
var thirdService = require('./routes/thirdService')

var app = express();

// 跨域
// 1.中间件解决
app.use(cors())

// 2.代理
app.all('*', function(res, response, next) {
  // 允许跨域的域名 * 代表所有
  response.header('Access-Control-Allow-Origin', '*')
  //允许的header类型
  response.header("Access-Control-Allow-Headers", "X-Requested-With");
  //跨域允许的请求方式
  response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //设置响应头信息
  response.header("X-Powered-By",' 3.2.1')
  response.header("Content-Type", "application/json;charset=utf-8");
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/menus', menusRouter);
app.use('/thirdService', thirdService)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// 数据库连接
const { connect, initSchemas } = require('./core/mongodb')
const mongoose = require('mongoose')
// 立即执行函数
;(async () => {
  await connect()
  initSchemas()
  // 建立一个User模型
  // const User = mongoose.model('User')
  // let oneUser = new User({ user_name: 'kim-jiang1', password: '123456' })
  // oneUser.save().then(() => {
  //   consola.ready('插入数据成功-0001')
  // })
  // let users = await User.findOne({}).exec()
  // console.log('------------------')
  // console.log(users)
  // console.log('------------------')
})()

module.exports = app;
