var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// mock菜单假数据
let menusMock = [
  {
    'id': 1,
    'path': '/system',
    'name': 'System',
    'component': 'Layout',
    'redirect': '/system/rolesManage',
    'meta': {
      'orderNo': 10,
      'title': '系统管理',
      'icon': 'el-icon-setting'
    },
    'children': [
      {
        'id': '2',
        'path': 'rolesManage',
        'name': 'RolesManage',
        'component': () => import('@/view/system/rolesManage/index.vue'),
        'meta': {
          'title': '角色管理',
          'keepAlive': true
        }
      },
      {
        'id': 3,
        'path': 'rolesDetails/:userId',
        'name': 'RolesDetails',
        'component': () => import('@/view/system/rolesManage/details.vue'),
        // props: { default: true },
        'meta': {
          'title': '角色详情',
          'keepAlive': true
        }
      }]
  },
  {
    'id': 4,
    'path': '/permissions',
    'name': 'Permissions',
    'component': 'Layout',
    'redirect': '/permissions/permissionsManage',
    'meta': {
      'orderNo': 100,
      'title': '权限管理',
      'icon': 'el-icon-menu'
    },
    'children': [
      {
        'id': 5,
        'path': 'permissionsManage',
        'name': 'PermissionsManage',
        'component': () => import('@/view/permissionsManage/index.vue'),
        'meta': {
          'title': '权限管理',
          'keepAlive': true,
          'icon': ''
        }
      }
    ]
  }
]

// menus/getMenus
router.post('/getMenus', function(req, res, next) {
  // rawHeaders
  // console.log('req', req.body, req.get('Authorization'), req.headers)
  const authorization = req.get('Authorization');
  if (authorization === '') {
    // 返回401
    res.status(401)
    res.send({
      code: '-1',
      msg: '请求失败，无token'
    })
  } else {
    let result = tokenValidate(authorization)
    console.log('res', result)
    if (result && typeof result !== 'object') {
      // 查询改角色下的菜单
      res.send({
        code: '1',
        msg: '请求成功',
        data: menusMock
      })
    } else {
      res.send(result)
    }
  }
})

function tokenValidate(authorization) {
  // 是否过期
  let token = authorization.split(' ')[1];
  let privateKey = 'myblogakakim'
  try {
    console.log('----------jwt', jwt);
    console.log('----------token', token);
    let result = {}
    let validRes = jwt.verify(token, privateKey, function(error,data){
      console.log('data', data, error)
      if (error) { // null
        if (error.name === 'TokenExpiredError') {
          result = {
            code: '-1',
            msg: 'token过期'
          }
        } else if(error.name === 'JsonWebTokenError') {
          result = {
            code: '-1',
            msg: '无效token'
          }
        }
        return result
      } else {
        // res.send({
        //   code: '1',
        //   msg: 'token验证成功'
        // })
        // 只要token是有效的 那就返回接口数据
        if (data.iat < data.exp) {
          console.log('data', data)
          return true //开始时间小于结束时间，代表token还有效
        } else {
          return false
        }
      }
    })
    return validRes
  } catch(error) {
    console.log(error)
    return false
  }
}

module.exports = router;