var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');

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

router.post('/download', function(req, res, next) {
  // res.writeHead(200, {
  //   "Content-type": "application/vnd.ms-excel", // 返回excel文件
  //   // 跨域
  //   "Access-Control-Allow-Origin": "*",
  //   "Access-Control-Allow-Headers": "content-type"
  // })

  // 异步读取文件内容
  fs.readFile("test.xlsx", (err, data) => {
    // 返回二进制流文件
    res.send({
      code: '1',
      msg: '请求成功',
      data: data
    })
  })
})

module.exports = router;
// 服务启动在4000端口
// server.listen(4000)
// console.log("server run at 4000")