/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 铃之椅 Node 服务端
 */

console.log("正在初始化...")

const { log, loge, logw } = require("./log")

const sio = require("socket.io")
const http = require("http")
const https = require("https")
const fs = require("fs")
const process = require("process")
const vals = require("./val")
const color = require("./color")

//定义 Http 服务器回调
let httpServerCallback = require("./http-api")

// 定义 Socket.io 服务器回调
let wsServerCallback = require("./ws-api")

let httpServer
if (vals.LINGCHAIR_SERVER_CONFIG.useHttps)
    httpServer = https.createServer({
        key: fs.readFileSync(vals.LINGCHAIR_SERVER_CONFIG.https.key),
        cert: fs.readFileSync(vals.LINGCHAIR_SERVER_CONFIG.https.cert),
    }, httpServerCallback)
else
    httpServer = http.createServer(httpServerCallback)

let wsServer = new sio.Server(httpServer)

const cachedClients = {}

let checkEmpty = (i) => {
    if (i instanceof Array) {
        for (k in i) {
            if (checkEmpty(i[k])) return true
        }
    }

    return (i == null) || ("" === i) || (0 === i)
}

wsServer.on("connect", (client) => {

    logw(`客户端 ${client.handshake.address} 已连接, 用户名(未经验证): ${client.handshake.auth.name}`)

    for (const cb in wsServerCallback) {
        client.on(cb, (...args) => {
            log(`客户端 ${client.handshake.address} 对接口 [${cb}] 发起请求,参数为 ${JSON.stringify(args[0])}`)
            let callback = args[args.length - 1]
            try {
                wsServerCallback[cb](args[0], (reArgs) => {
                    callback(reArgs)
                    if (reArgs.code != 0)
                        logw(`返回接口 [${cb}] 到 ${client.handshake.address},参数为 ${JSON.stringify(reArgs)}`)
                    else
                        log(`返回接口 [${cb}] 到 ${client.handshake.address},参数为 ${JSON.stringify(reArgs)}`)
                }, client, cachedClients)
            } catch (e) {
                loge(`调用接口或返回数据时出错: ${e}`)
                callback({ code: -1, msg: e })
            }
        })
    }

    client.on("disconnect", () => {
        if (!client.handshake.auth.passCheck)
            return logw(`未验证的客户端 ${client.handshake.address} 已断开, 未验证的用户名: ${client.handshake.auth.name}`)

        // 为了支持多客户端登录 我豁出去了
        if (cachedClients[client.handshake.auth.name].length === 1)
            cachedClients[client.handshake.auth.name] = null
        else
            cachedClients[client.handshake.auth.name].forEach((item, index, arr) => {
                if (item == client) {
                    arr.splice(index, 1)
                }
            })
        log(`客户端 ${client.handshake.address} 已断开, 用户名: ${client.handshake.auth.name}`)
    })

})

httpServer.listen(vals.LINGCHAIR_SERVER_CONFIG.port)

log(`${color.green}HTTP 和 WebSocket 服务已在端口 ${vals.LINGCHAIR_SERVER_CONFIG.port} 上启动，${vals.LINGCHAIR_SERVER_CONFIG.useHttps == true ? "已" : "未"}使用 HTTPS${color.none}`)
log(`${color.green}感谢使用!${color.none}`)
log(`${color.green}GitHub @MoonLeeeaf${color.none}`)
log(`${color.green}服务已启动...${color.none}`)
