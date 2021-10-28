var express = require('express');
var router = express.Router();

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
  res.send({
    code: '1',
    msg: '请求成功',
    data: menusMock
  })
})

module.exports = router;