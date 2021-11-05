var express = require('express');
var router = express.Router();
const mongoose = require('mongoose')

// mock菜单假数据
let menusMock = []

// menus/getMenus
router.post('/getRoleList', function(req, res, next) {
  console.log('body', req.body)
  const { userId } =  req.body
  // const user_id = req.body;
  // const Role = mongoose.model('Role');
  // Role.findById({ id: user_id}).then((res) => {
  //   console.log(res);
  // })
  res.send({
    code: '1',
    msg: '请求成功',
    data: {}
  })
})
module.exports = router;