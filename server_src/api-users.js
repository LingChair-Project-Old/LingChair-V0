/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 用户辅助类
 */

const io = require("./iolib")
const hash = require("./hashlib")
const vals = require("./val")

// 获取用户资料所在的路径
let getUserPath = (name) => {
    return vals.LINGCHAIR_DATA_DIR + "/users/" + name
}

// 用户是否存在
let isUserExists = (name) => {
    return io.exists(getUserPath(name))
}

let apis = {
    isUserExists: isUserExists,

    // ================================
    //         无需令牌的 API
    // ================================

    // 创建账号: 账号, 密码   返回账号唯一 ID 和成功信息   失败返回 null 和原因
    // 账号文件结构: {uid: 10000, name: "GenShin", nick: "Impact", passwd: "SHA-256 + MD5"}
    // 注意: 密码在客户端也应该经过哈希处理(SHA256 + MD5)
    // @APi
    signUp: (name, passwd) => {
        if (passwd == null || name == null)
            return { msg: "必须输入 账号和密码", code: -1 }

        let path = getUserPath(name)
        if (isUserExists(name))
            return { msg: "用户账号名重复", code: -1 }

        io.mkdirs(path)

        let idCount = io.open(vals.LINGCHAIR_USERS_COUNT_FILE)
        let uid = parseInt(idCount.read("*a"))
        idCount.write((uid + 1) + "").close()

        io.open(path + "/user.json").writeJson({
            uid: uid,
            name: name,
            nick: null,
            passwd: hash.sha256(passwd) + hash.md5(passwd),
        }).close()

        return { uid: uid, msg: "成功", code: 0 }
    },

    // 登录账号: 账号, 密码   返回刷新令牌   失败返回 null 和原因
    // 注意: 密码在客户端应该经过哈希处理(SHA256 + MD5)
    // @API
    signIn: (name, passwd) => {
        if (passwd == null || name == null)
            return { msg: "必须输入 账号和密码", code: -1 }

        if (!isUserExists(name))
            return { msg: "用户不存在", code: -1 }

        if (apis.getPassWordHashedRaw(name) !== (hash.sha256(passwd) + hash.md5(passwd)))
            return { msg: "账号所对应的密码错误", code: -1 }
        
        return { msg: "成功", code: 0, refreshToken: apis.getRefreshToken(name, apis.getPassWordHashed(name)) }
    },

    // 获取刷新令牌: 账号，密码   返回刷新令牌
    // 注意: 密码在客户端也应该经过哈希处理(SHA256 + MD5)
    // 刷新令牌算法: 哈希(用户ID + 当前年 + 当前月 + 密码 + 盐)
    // 有效期: 一个月
    getRefreshToken: (name, passwd) => {
        let d = new Date()
        let raw = name + d.getFullYear() + d.getMonth() + passwd + "LINGCHAIR-TEST-DEMO"
        return hash.sha256(raw) + hash.md5(raw)
    },

    // 获取访问令牌: 账号，刷新令牌   返回访问令牌
    // 注意: 密码在客户端也应该经过哈希处理(SHA256 + MD5)
    // 刷新令牌算法: 哈希(用户ID + 当前年 + 当前月 + 密码 + 盐)
    // 有效期: 一天
    getAccessTokenNonApi: (name, rt) => {
        if (!apis.checkRefreshToken(name, rt))
            return null
        let date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })
        return hash.sha256(name + date) + hash.md5(rt + date + "LINGCHAIR-ACCESS-TEST-DEMO")
    },

    // 获取密码(已被哈希处理)   返回密码
    // 在密码被设置前已经被哈希过,不需要重复
    // 算法: (SHA256 + MD5)
    // 警告: 这是经过二次哈希的
    getPassWordHashed: (name) => {
        return hash.sha256(apis.getPassWordHashedRaw(name)) + hash.md5(apis.getPassWordHashedRaw(name))
    },

    // 请勿与上面的混淆
    // 上面的是经过第二次哈希的
    getPassWordHashedRaw: (name) => {
        return io.open(getUserPath(name) + "/user.json").readJson().passwd
    },

    // 检测刷新令牌是否正确: 账号, 刷新令牌   返回布尔值
    // 密码在服务端经过哈希保存 不需要重复输入密码
    checkRefreshToken: (name, rt) => {
        return apis.getRefreshToken(name, apis.getPassWordHashed(name)) === rt
    },

    // 检测访问令牌是否正确: 账号, 访问令牌   返回布尔值
    // 密码在服务端经过哈希保存 不需要重复输入密码
    checkAccessToken: (name, at) => {
        return apis.getAccessTokenNonApi(name, apis.getRefreshToken(name, apis.getPassWordHashed(name /* 就是你这个傻逼害得我找两年BUG */))) === at
    },

    // ================================
    //         需要令牌的 API
    // ================================

    // 获取访问令牌: 账号, 刷新令牌   返回访问令牌  失败返回 -1 和原因
    // 有效期: 一天
    // 算法: SHA256(name) + MD5(rt + 盐)
    // @Api
    getAccessToken: (name, rt) => {
        if (!apis.checkRefreshToken(name, rt))
            return { msg: "刷新令牌不正确!", code: -1 }

        return { msg: "成功", code: 0, accessToken: apis.getAccessTokenNonApi(name, rt) }
    },

    // 设置头像: 账号, 访问令牌, 头像数据   返回结果
    // @API
    setHeadImage: (name, at, head) => {
        if (!apis.checkAccessToken(name, at))
            return { msg: "访问令牌不正确!", code: -1 }

        io.open(vals.LINGCHAIR_USERS_HEAD_DIR + "/" + name + ".png", "w").write(head).close()

        return { msg: "成功", code: 0 }
    },

    // 修改昵称
    // @APi
    setNick: (name, at, nick) => {
        if (!apis.checkAccessToken(name, at))
            return { msg: "访问令牌不正确!", code: -1 }
        
        let path = getUserPath(name)
        let configIo = io.open(path + "/user.json", "rw")

        let config = configIo.readJson()
        config.nick = nick
        configIo.writeJson(config)

        configIo.close()

        return { msg: "成功", code: 0 }
    },

    // 取联系人列表(好友): 账号, 访问令牌   返回好友列表
    getFriendsNonApi: (name, at) => {
        let file = getUserPath(name) + "/friends.json"
        if (!io.exists(file))
            io.open(file, "w").writeJson({list: [name]}).close()

        return io.open(file, "r").readJson().list
    },

    // 取用户昵称: 账号  返回昵称
    getNickNonApi: (name) => {
        let file = getUserPath(name) + "/user.json"

        return io.open(file, "r").readJson().nick
    },

    // 取昵称: 账号  返回昵称
    // @API
    getNick: (name, at) => {
        return { msg: "成功", code: 0, nick: apis.getNickNonApi(name)}
    },

    // 取联系人列表(好友): 账号, 访问令牌   返回好友列表
    // @API
    getFriends: (name, at) => {
        if (!apis.checkAccessToken(name, at))
            return { msg: "访问令牌不正确!", code: -1 }
        
        return { msg: "成功", code: 0, friends: apis.getFriendsNonApi(name, at)}
    },
}

module.exports = apis
