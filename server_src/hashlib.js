/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 哈希辅助类
 */

const crypto = require("crypto")

let apis = {
    sha256: (data) => crypto.createHash("sha256").update(data).digest("hex"),
    md5: (data) => crypto.createHash("md5").update(data).digest("hex"),
}

module.exports = apis
