var express = require('express');
var router = express.Router();
// const User = require('../models/user')
const { MD5_SUFFIX, responseClient, md5 } = require('../util/util')
const mongoose = require('mongoose')

/* GET users listing. */
// router.get('/home', function(req, res, next) {
//   res.send({ user_name: 'kim-jiang', password: '123456'} )
// });

router.get('/home',async(ctx)=>{
  ctx.body="这是用户操作首页"
})

// 登录
router.post('/login', function(req, res, next) {
  let { email, password } = req.body
  console.log(req.body)
  if (!email) {
    // responseClient(res, 400, 2, '用户邮箱不为空！')
    res.send({ code: -1, msg: '请求失败， 邮箱不为空！' })
    return;
  }
  if (!password) {
    res.send({ code: -1, msg: '请求失败， 密码不为空！' })
    return;
  }
  // 搜索数据库
  const User = mongoose.model('User')
  User.findOne({ email: email, password: password }).then((userInfo) => {
    if (userInfo) {
      console.log(userInfo)
      console.log('123sss')
      // 存储userInfo
      res.send({code: 1, msg: '请求成功', data: userInfo})
      localStorage.setItem('templeUser', userInfo)
      // req.session.userInfo = userInfo
    } else {
      res.send({code: -1, msg: '请求失败，用户名或密码错误' })
    }
  }).catch((err) => {
    console.log('123')
    res.send({code: -1, msg: '请求失败' })
  })
})

// 登出
router.post('/loginOut', function(req, res, next) {
  res.send({code: 1, msg: '登出成功' })
})

// 注册
router.post('/register', function(req, res, next) {
  let { email, password, check_password, validate_code } = req.body
  const User = mongoose.model('User')
  User.findOne({ email: email }).then((data) => {
    if (data) {
      res.send({ code: -1, msg: '请求失败， 邮箱已存在！' })
    } else {
      //  保存数据库
      let user = new User({
        email,
        password: md5(password + MD5_SUFFIX),
        check_password: md5(check_password + MD5_SUFFIX),
        validate_code,
      });
      user.save().then(data => {
        res.send(
          {
            code: 1,
            msg: '注册成功,welcome to new world!',
            data: {
              user_id: ''
            }
          }
        )
      }).catch((err) => {
        console.log(err)
      })
    }
  }).catch((err) => {
    console.log(err)
  })
})

module.exports = router;


// 另一种请求方式
// exports.register = (req,res) => {
//   let { email, password, check_password, validate_code } = req.body
//   User.findOne({ email: email }).then((data) => {
//     if (data) {
//       responseClient(res,200,1, '用户邮箱已存在！')
//     }
//     // 保存数据库
//     let user = new User({
//       email,
//       password: md5(password + MD5_SUFFIX),
//       check_password: md5(check_password + MD5_SUFFIX),
//       validate_code,
//     });
//     user.save().then(data => {
//       responseClient(res, 200, 0, '注册成功', data);
//     });
//   }).catch((err) => {
//     responseClient(res)
//     return
//   })
// }


