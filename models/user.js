/*
  * @description user module 用户数据模型
  * @author kim-jiang <https://github.com/NewbieKim>
*/
const mongoose = require('mongoose')
const crypto = require('crypto')
const yargs = require('yargs')
const autoIncrement = require('mongoose-auto-increment')
// 声明Schema 可以理解为一张表的映射
const Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId

// 创建user Schema
const userSchema = new Schema({
  user_id: { type: String, default: '' },
  user_name: { type: String, default: '' },
  email: { type: String, default: '' },
  phone: { type: String, default: '' },
  avatar: { type: String, default: '' },
  password: {
    type: String,
    require: true,
    default: crypto
      .createHash('md5')
      .update(yargs.auth_default_password || 'root')
      .digest('hex')
  },
  create_time: { type: Date, default: Date.now() },
  last_login_time: { type: Date, default: Date.now() }
})

// 自增ID插件配置
// userSchema.plugin(autoIncrement.plugin,{
//   model: 'User',
//   field: 'id',
//   startAt: 1,
//   incrementBy: 1
// });

// 发布模型
mongoose.model('User', userSchema);