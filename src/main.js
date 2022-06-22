/*
 * @Author: Jiezhangxiang 1778676211@qq.com
 * @Date: 2022-06-22 14:12:34
 * @LastEditors: Jiezhangxiang 1778676211@qq.com
 * @LastEditTime: 2022-06-22 17:44:12
 * @FilePath: \webpack5-template\src\main.js
 * @Description: 打包入口文件
 */
import "./style/css/index.less"
let a = 1
const b = 2
const count = (a1 = a, b1 = b) => {
  return a1 + b1
}
console.log(count())
