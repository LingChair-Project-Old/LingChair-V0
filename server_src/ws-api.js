/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 铃之椅 Node 服务端
 */

const log = (t) => {
    console.log("[" + new Date().toLocaleTimeString('en-US', { hour12: false }) + "] " + t)
}

const msgs = require("./api-msgs")
const users = require("./api-users")
const color = require("./color")

let checkEmpty = (i) => {
    if (i instanceof Array) {
        for (k in i) {
            if (checkEmpty(i[k])) return true
        }
    }

    return (i == null) || ("" === i) || (0 === i)
}

/*
 * Api 规范:
 * 1. 禁止中文 拼音
 * 2. 一个 Api 做一件事 同一组 Api 用注释行分隔
 * 3. 尽可能简单易懂 或者打注释
 * 4. 保证客户端可用
 */

// Api 调用:

// 一般规定, code=0 正常, code=-1 异常, code=-2 运行时错误  另外还需要 msg="any"

// 可以随便 return 进行函数中断 因为这里的调用不会取返回值

let api = {
    // ---------- 用户 API ----------

    // 验证
    // 调用方法自己看
    "user.auth": (a, cb, client, cachedClients) => {
        if (checkEmpty([a.name, a.refreshToken]))
            return cb({ msg: "参数缺失", code: -1 })

        if (!users.checkRefreshToken(a.name, a.refreshToken))
            return cb({ code: -1, msg: "刷新令牌错误", invalid: true })

        log(color.yellow + "客户端 " + client.handshake.address + " 完成了用户 " + a.name + " 的验证" + color.none)

        // 更新映射
        client.handshake.auth.passCheck = true
        if (cachedClients[a.name] == null)
            cachedClients[a.name] = []
        cachedClients[a.name].push(client)

        cb({ code: 0, msg: "成功" })
    },

    // 注册
    // {name: 账号, nick: 昵称, passwd: 密码} 返回 {data: {uid: 账号ID}}
    // 密码在客户端应该经过哈希处理 算法为 SHA256+MD5
    // 客户端在注册成功之后应该引导用户登录
    "user.signUp": (a, cb) => {
        if (checkEmpty([a.name, a.passwd]))
            return cb({ msg: "参数缺失", code: -1 })

        let { uid, msg, code } = users.signUp(a.name, a.passwd)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0, data: { uid: uid } })
    },
    // 登录
    // {name: 账号, passwd: 密码} 返回 {data: {refreshToken: 刷新令牌}}
    // 密码在客户端应该经过哈希处理 算法为 SHA256+MD5
    "user.signIn": (a, cb) => {
        if (checkEmpty([a.name, a.passwd]))
            return cb({ msg: "参数缺失", code: -1 })


        let { refreshToken, msg, code } = users.signIn(a.name, a.passwd)

        if (code !== 0)
            return cb({ msg: msg, code: code })


        cb({ msg: msg, code: 0, data: { refreshToken: refreshToken } })
    },

    // 获取访问令牌
    // {name: 账号, refreshToken: 刷新令牌} 返回 {data: {accessToken: 访问令牌}}
    "user.getAccessToken": (a, cb) => {
        if (checkEmpty([a.name, a.refreshToken]))
            return cb({ msg: "参数缺失", code: -1 })

        let { accessToken, msg, code } = users.getAccessToken(a.name, a.refreshToken)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0, data: { accessToken: accessToken } })
    },

    // 上传头像
    // {name: 账号, accessToken: 访问令牌, headImage: 头像数据} 返回 {}
    "user.setHeadImage": (a, cb) => {
        if (checkEmpty([a.name, a.accessToken, a.headImage]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code } = users.setHeadImage(a.name, a.accessToken, a.headImage)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0 })
    },

    // 修改昵称
    "user.setNick": (a, cb) => {
        if (checkEmpty([a.name, a.accessToken, a.nick]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code } = users.setNick(a.name, a.accessToken, a.nick)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0 })
    },

    // ---------- 联系人 API --------

    // 获取好友列表
    // {name: 账号, accessToken: 访问令牌} 返回 {friends: []}
    "user.getFriends": (a, cb) => {
        if (checkEmpty([a.name, a.accessToken]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code, friends } = users.getFriends(a.name, a.accessToken)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0, data: { friends: friends } })
    },

    // 添加好友
    // {name: 账号, accessToken: 访问令牌}
    "user.addFriend": (a, cb) => {
        if (checkEmpty([a.name, a.target, a.accessToken]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code } = users.addFriend(a.name, a.target, a.accessToken)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0 })
    },

    "user.getNick": (a, cb) => {
        if (checkEmpty([a.name]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code, nick } = users.getNick(a.name)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0, data: { nick: nick } })
    },

    // ---------- 通讯 API ----------

    // 单聊发送消息
    // {name: 当前用户, target: 发送到, accessToken: 访问密钥, msg: 消息内容}
    // 2024.3.30: 支持对方收到消息
    "user.sendSingleMsg": (a, cb, c, cache) => {
        if (checkEmpty([a.name, a.target, a.accessToken, a.msg]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code, msgid, time } = msgs.sendSingleMsg(a.name, a.accessToken, a.target, a.msg)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        // 微机课闲的没事干玩玩 发现私聊会多发一个(一个是本地的, 另一个是发送成功的) 选择一个关掉就好了
        // 这里我选择客户端, 否则没法多设备同步
        let args = {
            target: a.name,
            msg: {
                msgid: msgid,
                time: time,
                msg: a.msg,
                name: a.name,
            },
            type: "single",
        }

        if (cache[a.target] != null)
            cache[a.target].forEach((v) => {
                v.emit("msg.receive", args, () => { })
                log("尝试向客户端 " + v.handshake.address + " 发送事件 [msg.receive], 参数为 " + JSON.stringify(args))
            })

        cb({ msg: msg, code: 0, data: { time: time, msgid: msgid } })
    },

    // 单聊获取历史记录
    // {name: 当前用户, target: 聊天目标, accessToken: 访问密钥, startId: 计次开始的msgid, limit: 最大返回数(最大100)}
    "user.getSingleChatHistroy": (a, cb) => {
        if (checkEmpty([a.name, a.target, a.accessToken, a.limit]))
            return cb({ msg: "参数缺失", code: -1 })

        let { msg, code, histroy } = msgs.getSingleMsgHistroy(a.name, a.accessToken, a.target, a.startId, a.limit)

        if (code !== 0)
            return cb({ msg: msg, code: code })

        cb({ msg: msg, code: 0, data: { histroy: histroy } })
    },
}

module.exports = api
