
/*
  *数据库连接模块
  *module core/mongoose
*/

const consola = require('consola')
const mongoose = require('mongoose')
// db为数据库名称
const db = "mongodb://localhost/mygreatepro"
// const autoIncerement = required('mongoose-auto-increment')
mongoose.Promise = global.Promise

const { resolve } = require('path')
const glob = require('glob')

exports.connect = () => {
  let maxConnectionTimes = 0
  mongoose.connect(db)
  // 数据库中断 进行重新连接
  mongoose.connection.on('disconnected', () => {
    mongoose.connect(db)
    if (maxConnectionTimes<3) {
      maxConnectionTimes++
      mongoose.connect(db)
    } else {
      consola.warn('数据库连接异常，请人为修复')
    }
  })
  mongoose.connection.on('error', error => {
    consola.warn('数据库连接失败', error)
    if (maxConnectionTimes<3) {
      maxConnectionTimes++
      mongoose.connect(db)
    } else {
      consola.warn('数据库连接异常，请人为修复')
    }
  })
  mongoose.connection.once('open', () => {
    consola.ready('数据库连接成功')
  })
  return mongoose
}

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, '../models', '**/*.js')).forEach(require)
}


