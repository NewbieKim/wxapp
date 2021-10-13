/*
  * @description 一次性引入Schema文件
  * @author kim-jiang <https://github.com/NewbieKim>
*/
// glob：node的glob模块允许你使用 * 等符号，来写一个glob规则，像在shell里一样，获取匹配对应规则文件
// resolve: 将一系列路径或路径段解析为绝对路径。
const path = require('path')
const glob = require('glob')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, '../models', '**/*.js')).forEach(require)
}