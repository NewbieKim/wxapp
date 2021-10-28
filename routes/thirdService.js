var express = require('express');
var router = express.Router();

let mockData = [
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
]

// menus/getMenus
router.post('/upload', function(req, res, next) {
  console.log(req);
  res.send({
    code: '1',
    msg: '请求成功',
    data: mockData
  })
})

module.exports = router;