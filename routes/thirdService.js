// @ts-nocheck
var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
const multer = require('@koa/multer');
const cors = require('@koa/cors');
const path = require('path');
const multiparty = require('multiparty')
const axios = require("axios")

//服务器配置
const client = require("ssh2-sftp-client")
const config = {
  path: {
    remotePath: "/public",
    localPath: path.resolve(__dirname, './uploads/t1.png')
  },
  remotePath: "",
  remote: {
    host: "120.79.113.248",
    port: "22",
    username: "root",
    password: "Kimsweb123%"
  }
}


let mockData = [
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  }
]

const service = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 5000
})

// menus/getMenus

// 上传至服务器
router.post('/upload1', function(req, res, next) {
  var form = new multiparty.Form();
  const sftp = new client()
  form.encoding = 'utf-8';
  console.log("__dirname", __dirname)
  sftp.connect(config.remote).then(() => {
    console.log('----------------------------- 连接成功,上传中... -----------------------------')
    return sftp.uploadDir(config.path.localPath, config.path.remotePath)
  }).then((data) => {
    console.log('----------------------------- 上传成功 -----------------------------')
  }).catch((err) => {
    console.log(err)
  }).finally(() => {
    sftp.end()
  })
}),

router.post('/upload', function(req, res, next) {
  console.log('sexy girl body', req.body);
  let data = {url: '', img: ''}
  var form = new multiparty.Form();
  form.encoding = 'utf-8';
  console.log("__dirname", __dirname)
  form.uploadDir = __dirname+"/uploads";
  form.parse(req, function(err, fields, files) {
    if(err){
      console.log('错误', err);
      res.send({
        code: '-1',
        msg: '上传失败',
      });
      return ;
    }
    fs.renameSync(files.file[0].path, __dirname+"/uploads" + files.file[0].originalFilename);
    console.log(files);
    data.img = files.file[0].path
    console.log(data.img);
    data.len = files.length;
    // res.writeHead(200,{"Content-type":"text/html;charset=UTF-8"});
    res.send({
      code: '1',
      msg: '上传成功',
      data: data
    })
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


module.exports = router;
// 服务启动在4000端口
// server.listen(4000)
// console.log("server run at 4000")