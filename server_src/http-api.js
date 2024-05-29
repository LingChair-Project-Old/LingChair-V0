/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 铃之椅 Node 服务端
 */

// 不得不说 express 太强了

const vals = require("./val")
const express = require("express")

let api = express()

api.use("/", express.static("ling_chair_http"))
api.use("/users_head/", express.static(vals.LINGCHAIR_DATA_DIR + "/users_head"))

module.exports = api
