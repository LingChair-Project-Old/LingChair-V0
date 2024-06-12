/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 铃之椅 Node 服务端
 */

const io = require("./iolib")

let vals = {}

// 配置目录
vals.LINGCHAIR_CONFIG_DIR = "ling_chair_data"
// HTTP 服务器资源目录
vals.LINGCHAIR_HTTP_DIR = "ling_chair_http"
// 服务端配置
vals.LINGCHAIR_SERVER_CONFIG_FILE = vals.LINGCHAIR_CONFIG_DIR + "/server.json"

// 主要数据目录
vals.LINGCHAIR_DATA_DIR = "ling_chair_data"

// 用户数据
vals.LINGCHAIR_USERS_DATA_DIR = vals.LINGCHAIR_DATA_DIR + "/users"
// 用户头像
vals.LINGCHAIR_USERS_HEAD_DIR = vals.LINGCHAIR_DATA_DIR + "/users_head"

// 群聊消息
vals.LINGCHAIR_GROUP_MESSAGE_DIR = vals.LINGCHAIR_DATA_DIR + "/messages/group"
// 单聊消息
vals.LINGCHAIR_SINGLE_MESSAGE_DIR = vals.LINGCHAIR_DATA_DIR + "/messages/single"

// 用户 ID 计次
vals.LINGCHAIR_USERS_COUNT_FILE = vals.LINGCHAIR_USERS_DATA_DIR + "/count.txt"

// 创建必备目录
io.mkdirs(vals.LINGCHAIR_CONFIG_DIR)
io.mkdirs(vals.LINGCHAIR_USERS_DATA_DIR)
io.mkdirs(vals.LINGCHAIR_USERS_HEAD_DIR)
io.mkdirs(vals.LINGCHAIR_GROUP_MESSAGE_DIR)
io.mkdirs(vals.LINGCHAIR_SINGLE_MESSAGE_DIR)

// 生成服务端配置文件
if (!io.exists(vals.LINGCHAIR_SERVER_CONFIG_FILE)) io.open(vals.LINGCHAIR_SERVER_CONFIG_FILE, "w").write(JSON.stringify({
    useHttps: false,
    port: 3601,
    bindAddress: "",
    https: {
        key: "",
        cert: "",
    },
})).close()
if (!io.exists(vals.LINGCHAIR_USERS_COUNT_FILE))
    io.open(vals.LINGCHAIR_USERS_COUNT_FILE, "w").write("10000").close()

// 加载服务端配置文件
vals.LINGCHAIR_SERVER_CONFIG = JSON.parse(io.open(vals.LINGCHAIR_SERVER_CONFIG_FILE, "r").read("*a"))

module.exports = vals
