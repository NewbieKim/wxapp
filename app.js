// 引入各模块
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const consola = require('consola');
// const bodyParser = require('body-parser');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const proxy = require('koa-server-http-proxy')

// 跨域问题
const cors = require('cors')

// 引入路由
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roleRouter = require('./routes/role');
var menusRouter = require('./routes/menus');
var thirdServiceRouter = require('./routes/thirdService');

var app = express();

// 跨域
// 1.中间件解决
// app.use(cors())

// 解析数据
// app.use(bodyParser.json());//数据JSON类型
// app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据

// app.use(koaBody)

// 2.代理
app.all('*', function(res, response, next) {
  // 允许跨域的域名 * 代表所有
  // response.header('Access-Control-Allow-Origin', 'http://localhost:4001')
  // 允许跨域的域名：同请求
  // response.header("Access-Control-Allow-Headers", "X-Requested-With");
  //跨域允许的请求方式
  response.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  //设置响应头信息
  response.header("X-Powered-By",' 3.2.1')
  response.header("Content-Type", "application/json;charset=utf-8");
  // response.setHeader('Access-Control-Allow-Origin',"*");
  // response.setHeader('Access-Control-Allow-Headers','Content-Type');
  next()
})

// app.use(proxy('/yunpos', {
//   target: 'http://47.107.229.134:8080',
//   pathRewrite: { '^/yunpos': '' },
//   changeOrigin: true
// }))

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
app.use('/role', roleRouter);
app.use('/menus', menusRouter);
app.use('/thirdService', thirdServiceRouter);

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

// 简单部署
app.use(express.static(path.join(__dirname, 'dist')))
// app.listen(3000, () => {
//   console.log('app listening on port 3000')
// })

// 数据库连接
const { connect, initSchemas } = require('./core/mongodb')
const mongoose = require('mongoose')
// 立即执行函数
;const { ObjectId } = require('bson');
(async () => {
  await connect()
  initSchemas()
  consola.log('1111')
  // 建立一个User模型
  const Role = mongoose.model('Role')
  const User = mongoose.model('User')
  let oneRole = new Role({ id: 3, role_name: '普通用户', user_id: ObjectId("5ff41cc2315d055a58946524") })
  // oneRole.save().then(() => {
  //   consola.ready('插入数据成功-0001')
  // })
  // let oneUser = new User({ user_id: 0001, user_name: '测试小江' })
  // oneUser.save().then(() => {
  //   consola.ready('插入数据成功-0001')
  // })
  let result = await Role.find({}).populate('user_id', {}).exec();
  // consola.log('res', result);
  // let roleList = []
  // result.forEach(item => {
  //   if (item.__v.indexOf(userId) > -1) {
  //     roleList.push(item);
  //   }
  // });
  let users = await User.find({ user_name: '测试小江' }).populate('role_id').exec();
  console.log('------------------')
  console.log(result);
  console.log('------------------')
  console.log(users);
  console.log('------------------')
})()

module.exports = app;
