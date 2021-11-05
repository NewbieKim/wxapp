/*
  * @description roles module 角色数据模型
  * @author kim-jiang <https://github.com/NewbieKim>
*/
const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
// 声明Schema 可以理解为一张表的映射
const Schema = mongoose.Schema
// let ObjectId = Schema.Types.ObjectId

// 创建user Schema
const roleSchema = new Schema({
  id: { type: String, default: '' },
  role_name: { type: String, default: '' },
  cn_name: { type: String, default: '' },
  guard_name: { type: String, default: '' },
  is_locked: { type: Number, default: 0 },
  create_time: { type: Date, default: Date.now() },
  update_time: { type: Date, default: Date.now() },
  description: { type: Date, default: Date.now() },
  // 关联user表
  user_id: {
    ref: 'User',
    type: Schema.Types.ObjectId,
  }
})

// 自增ID插件配置
// userSchema.plugin(autoIncrement.plugin,{
//   model: 'User',
//   field: 'id',
//   startAt: 1,
//   incrementBy: 1
// });

// 发布模型
mongoose.model('Role', roleSchema);