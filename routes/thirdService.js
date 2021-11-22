var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const path = require('path');

let mockData = [
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
]

// menus/getMenus

router.post('/upload', function(req, res, next) {
  console.log('sexy girl body', req.body, res);
  res.send({
    code: '1',
    msg: '请求成功',
    data: mockData
  })
})


// 三方下载
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

// 三方上传
// router.post('/upload/single', function(req, res, next) {
  
// })


// 存储上传信息
const UPLOAD_DIR = path.join(__dirname, "/public/upload");
const storage = multer.diskStorage({
  destination: async function(req, res ,next) {
    console.log('dis', req, res)
    cb(null, UPLOAD_DIR)
  },
  filename: function (req, file, cb) {
    console.log('filename', req, res)
    cb(null, 'file')
  }
})
const multerUpload = multer()

router.post('/uploadSingle', function(req, res, next){
  console.log('--------req body uploadSingle', JSON.stringify(req.body))
  try {
    res.send({
      code: 1,
      msg: '文件上传成功',
      data: { url: '123' }
    })
  } catch (error) {
    console.log(error)
  }
})

// router.post('/upload', (ctx, next) => {
//   console.log('ctx.request.file', ctx.request.file);
//   console.log('ctx.file', ctx.file);
// })

module.exports = router;
// 服务启动在4000端口
// server.listen(4000)
// console.log("server run at 4000")