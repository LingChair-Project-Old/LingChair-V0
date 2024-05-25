/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 通讯辅助类
 */

const io = require("./iolib")
const hash = require("./hashlib")
const vals = require("./val")
const users = require("./api-users")

let getSameHashedValue = (a, b) => {
    let _a = [hash.md5(a) + hash.sha256(a), hash.md5(b) + hash.sha256(b)].sort()
    let [_1, _2] = _a
    return hash.sha256(hash.sha256(_1) + hash.sha256(_2))
}

let getSingleChatDir = (a, b) => {
    return vals.LINGCHAIR_SINGLE_MESSAGE_DIR + "/" + getSameHashedValue(a, b)
}

let apis = {
    // 储存单聊消息: 操作者, 访问密钥, 发送至, 消息内容
    // 消息存储方式为计次直接储存, 每一个消息都有对应的 ID
    // 读取某一段落时使用遍历方式
    // @API
    sendSingleMsg: (name, accessToken, target, msg) => {
        if (!users.checkAccessToken(name, accessToken))
            return { code: -1, msg: "访问令牌错误" }

        if (!users.isUserExists(target))
            return { code: -1, msg: "目标用户不存在" }

        if (msg.trim() == "")
        return { code: -1, msg: "不是有内容的消息我不要" }

        let fileDir = getSingleChatDir(name, target)
        io.mkdirs(fileDir)

        let countFile = io.open(fileDir + "/count.txt", "rw")
        if (!io.exists(fileDir + "/count.txt"))
            countFile.write("0")

        let count = parseInt(countFile.read())
        count += 1
        let time = Date.now()
        io.open(fileDir + "/msg_" + count + ".json", "w").writeJson({
            name: name,
            msg: msg,
            msgid: count,
            time: time,
        }).close()

        countFile.write(count + "")

        return { code: 0, msg: "成功", msgid: count, time: time }
    },
    // 读取消息记录
    // 从起始点到结束点读取,由最新到最老(计次越大越新)
    // 不提供 startId 则默认从最新计次往前数
    // 若超过 limit 计次范围, 直接终止遍历
    // @API
    getSingleMsgHistroy: (name, accessToken, target, sid, limit) => {
        if (!users.checkAccessToken(name, accessToken))
            return { code: -1, msg: "访问令牌错误" }

        if (!users.isUserExists(target))
            return { code: -1, msg: "目标用户不存在" }

        let fileDir = getSingleChatDir(name, target)
        io.mkdirs(fileDir)
        let countFile = io.open(fileDir + "/count.txt", "rw")

        if (!io.exists(fileDir + "/count.txt"))
            countFile.write("0")

        let startId = sid
        if (startId == null)
            startId = parseInt(countFile.read().toString())

        let list = []
        let i = startId
        let i2 = 0
        let cfn
        while(true) {
            cfn = fileDir + "/msg_" + i + ".json"
            // 1. 超过界限
            // 2. 超过计次
            // 3. 超过最大限度
            if ((!io.exists(cfn)) || i2 > limit || i2 > 100) break
            try {
                let data = io.open(cfn, "r").readJson()
                list.unshift(data)
            } catch (e) {
                return { code: -2, msg: e }
            }
            i--
            i2++
        }

        return { code: 0, msg: "成功", histroy: list }
    },

    // 上传图片: 操作者, 访问密钥, 发送至, 图片
    // 未来需要一些操作来删除未使用的图片文件
    // @API
    uploadImage: (name, accessToken, target, msg) => {
        if (!users.checkAccessToken(name, accessToken))
            return { code: -1, msg: "访问令牌错误" }

        if (!users.isUserExists(target))
            return { code: -1, msg: "目标用户不存在" }

        let fileDir = getSingleChatDir(name, target) + "/images/"
        io.mkdirs(fileDir)


    },
}

module.exports = apis
