/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 业务逻辑
 */

// ================================
//             当前用户
// ================================

class CurrentUser {
    static myAccessToken
    // 登录账号  通过回调函数返回刷新令牌
    static signIn(name, passwd, cb) {
        client.emit("user.signIn", {
            name: name,
            passwd: Hash.sha256(passwd) + Hash.md5(passwd),
        }, (re) => {
            if (re.code !== 0)
                return mdui.snackbar(re.msg)

            cb(re)
        })
    }
    static signUp(name, passwd, cb) {
        client.emit("user.signUp", {
            name: name,
            passwd: Hash.sha256(passwd) + Hash.md5(passwd),
        }, (re) => {
            if (re.code !== 0)
                return mdui.snackbar(re.msg)

            cb(re)
        })
    }
    // 为登录对话框编写的
    static signInWithDialog(name, passwd) {
        this.signIn(name, passwd, (re) => {
            localStorage.refreshToken = re.data.refreshToken
            localStorage.isSignIn = true

            location.reload()
        })
    }
    static async setNick(nick, cb) {
        client.emit("user.setNick", {
            name: localStorage.userName,
            accessToken: await this.getAccessToken(),
            nick: nick,
        }, (re) => {
            if (re.code !== 0)
                return mdui.snackbar(re.msg)
            if (cb) cb()
        })
    }
    // 获取头像链接
    static getUserHeadUrl(name) {
        return client.io.uri + "/users_head/" + name + ".png"
    }
    static async getAccessToken(er) {
        if (this.myAccessToken == null)
            this.myAccessToken = await new Promise((res) => {
                client.emit("user.getAccessToken", { name: localStorage.userName, refreshToken: localStorage.refreshToken }, (r) => {
                    if (r.data != null) res(r.data.accessToken)
                    if (er != null) er(r.msg)
                })
            })
        return this.myAccessToken
    }
    static uploadHeadImage() {
        viewBinding.uploadHeadImage.click()
    }
    static async uploadHeadImageCallback(self) {
        let img = self.files[0]
        client.emit("user.setHeadImage", {
            name: localStorage.userName,
            accessToken: await CurrentUser.getAccessToken(),
            headImage: img,
        }, (re) => mdui.snackbar(re.msg))
    }
    static auth() {
        client.emit("user.auth", { name: localStorage.userName, refreshToken: localStorage.refreshToken }, (re) => {
            if (re.code !== 0) {
                console.error(re)
                if (!re.invalid)
                    return mdui.snackbar("验证用户失败！")

                mdui.alert("账号刷新令牌已过期, 请重新登录哦", "提示", () => CurrentUser.signOutAndReload(), {
                    confirmText: "确定",
                    closeOnConfirm: false,
                    closeOnEsc: false,
                    modal: true,
                })
            }
        })
    }
    static signOutAndReload() {
        localStorage.refreshToken = ""
        localStorage.isSignIn = false

        setTimeout(() => location.reload(), 300)
    }
    static registerCallback() {
        client.on("msg.receive", async (a) => {
            if (checkEmpty([a.target, a.msg, a.type]))
                return

            if ((ChatMsgAdapter.target === a.target) && (ChatMsgAdapter.type === a.type)) {
                let i = ChatMsgAdapter.isAtBottom()
                await ChatMsgAdapter.addMsg(a.target, a.msg.msg, a.msg.time)
                if (i) ChatMsgAdapter.scrollToBottom()
            }

            if (ChatMsgAdapter.target !== localStorage.userName) {
                let n = new 通知().setTitle("" + await NickCache.getNick(a.target)).setMessage(a.msg.msg).setIcon(CurrentUser.getUserHeadUrl(a.target)).show(async () => {
                    await ChatMsgAdapter.switchTo(a.target, a.type)
                    location.replace("#msgid_" + a.msg.msgid)
                    n.close()
                })
            }
        })
    }
    static async openProfileDialog(name) {
        viewBinding.dialogProfileHead.attr("src", CurrentUser.getUserHeadUrl(name))
        viewBinding.dialogProfileNick.text(await NickCache.getNick(name))
        new mdui.Dialog(viewBinding.dialogProfile).open()
    }
}

// ================================
//             昵称缓存
// ================================

class NickCache {
    static data = {}
    static async getNick(name) {
        return await new Promise((res, rej) => {
            // 这个this别摆着不放啊 不然两下就会去世
            let nick = this.data[name]
            if (nick == null)
                client.emit("user.getNick", { name: localStorage.userName }, (re) => {
                    let nk = re.data != null ? re.data.nick : name
                    if (nk == null) nk = name
                    this.data[name] = nk
                    res(nk)
                })
            else
                res(nick)
        })
    }
}

class ContactsList {
    static async reloadList() {
        client.emit("user.getFriends", {
            name: localStorage.userName,
            accessToken: await CurrentUser.getAccessToken(),
        }, async (re) => {
            if (re.code !== 0)
                return mdui.snackbar(re.msg)

            viewBinding.contactsList.empty()
            let ls = re.data.friends
            for (let index in ls) {
                let name = ls[index]
                let dick = await NickCache.getNick(name)
                $($.parseHTML(`<li class="mdui-list-item mdui-ripple" mdui-drawer-close><div class="mdui-list-item-avatar"><img src="` + CurrentUser.getUserHeadUrl(name) + `" onerror="this.src='res/default_head.png'" /></div><div class="mdui-list-item-content">` + dick + `</div></li>`)).appendTo(viewBinding.contactsList).click(() => {
                    ChatMsgAdapter.switchTo(name, "single")
                })
            }

        })
    }
    // 添加联系人，好友或者群聊
    static add(name, type) {
        if (type == "single") {

        }
    }
    static openAddDialog() {
        new mdui.Dialog(viewBinding.dialogNewContact.get(0)).open()
    }
}

// 消息核心

class ChatPage {
    static cached = {}
    constructor(name, type) {

    }
    static switchTo(name, type) {
        if (!this.cached[name])
            this.cached[name] = new ChatPage(name, type)
    }
}

class ChatMsgAdapter {
    static type
    static target
    static minMsgId
    static time
    static bbn
    static resizeDick
    // 切换聊天对象
    static async switchTo(name, type) {
        viewBinding.tabChatSeesion.show()
        viewBinding.tabChatSeesion.text(await NickCache.getNick(name))
        viewBinding.tabChatSeesion.get(0).click()

        this.type = type
        this.target = name
        this.minMsgId = null

        viewBinding.pageChatSeesion.empty()

        await this.loadMore()
        this.scrollToBottom()
    }
    // 发送消息
    static async send(msg) {
        client.emit("user.sendSingleMsg", {
            name: localStorage.userName,
            target: this.target,
            msg: msg,
            accessToken: await CurrentUser.getAccessToken(),
        }, async (re) => {
            if (re.code !== 0)
                return mdui.snackbar(re.msg)

            viewBinding.inputMsg.val("")

            // 微机课闲的没事干玩玩 发现私聊会多发一个(一个是本地的, 另一个是发送成功的) 选择一个关掉就好了
            // 这里我选择服务端不发送回调, 不然多设备同步会吵死
            // 错了 应该是客户端少发条才对 不然不能多设备同步
            if ((ChatMsgAdapter.target !== localStorage.userName) && ChatMsgAdapter.type === "single") {
                let i = ChatMsgAdapter.isAtBottom()
                await ChatMsgAdapter.addMsg(localStorage.userName, msg, re.data.time, re.data.msgid)
                if (i) ChatMsgAdapter.scrollToBottom()
            }
        })
    }
    static async getHistroy(start, limit) {
        return new Promise(async (res, rej) => {
            client.emit("user.getSingleChatHistroy", {
                name: localStorage.userName,
                target: this.target,
                limit: limit,
                accessToken: await CurrentUser.getAccessToken(),
                startId: start,
            }, (re) => {
                if (re.code !== 0)
                    return mdui.snackbar(re.msg)
                res(re.data.histroy)
            })
        })
    }
    static async loadMore(limit) {
        let histroy = await this.getHistroy(this.minMsgId, limit == null ? 13 : limit)

        if (histroy.length == 0)
            return mdui.snackbar("已经加载完了~")

        let re = this.minMsgId != null
        this.minMsgId = histroy[0].msgid - 1
        let sc = 0
        if (re) histroy = histroy.reverse()
        for (let index in histroy) {
            let i = histroy[index]
            let e = await this.addMsg(i.name, i.msg, i.time, re, i.msgid)
            // 因为某些因素直接DEBUG到吐血 断点继续都不报错 原因不明
            sc = sc + (e == null ? 25 : e.get(0).offsetTop)
        }
        window.scrollBy({
            top: sc,
            behavior: 'smooth'
        })
    }
    static addSystemMsg(m, re) {
        let e
        if (re)
            // 加到头部
            e = $($.parseHTML(m)).prependTo(viewBinding.pageChatSeesion)
        else
            // 加到尾部
            e = $($.parseHTML(m)).appendTo(viewBinding.pageChatSeesion)
        return e
    }
    static isAtBottom() {
        let elementRect = viewBinding.pageChatSeesion.get(0).getBoundingClientRect()
        return (elementRect.bottom <= window.innerHeight)
    }
    // 添加消息 返回消息的JQ对象
    // name: 用户id  m: 消息  t: 时间戳  re: 默认加到尾部  msgid: 消息id
    static async addMsg(name, m, t, re, msgid) {

        let nick = await NickCache.getNick(name) // re.data == null ? name : re.data.nick

        let msg = escapeHTML(m)

        let temp
        if (name === localStorage.userName)
            temp = `<div class="chat-message-right">
                <div class="message-content-with-nickname-right">
                <span class="nickname">` + nick + `</span>
                <div class="message-content mdui-card" id="msgid_` + msgid + `">
                <span id="msg-content">` + msg + `</span>
                </div>
                </div>
                <img class="avatar" src="` + CurrentUser.getUserHeadUrl(name) + `" onerror="this.src='res/default_head.png'" />
                </div>`
        else
            temp = `<div class="chat-message-left">
                <img class="avatar" src="` + CurrentUser.getUserHeadUrl(name) + `" onerror="this.src='res/default_head.png'" />
                <div class="message-content-with-nickname-left">
                <span class="nickname">` + nick + `</span>
                <div class="message-content mdui-card" id="msgid_` + msgid + `">
                <span id="msg-content">` + msg + `</span>
                </div>
                </div>
                </div>`

        let bn = new Date(t).getMinutes()
        let e
        if (re) {
            this.addSystemMsg(temp, re)
            if (this.bbn != bn) {
                e = this.addSystemMsg(`<div class="mdui-center">` + new Date().format(t == null ? Date.parse("1000-1-1 00:00:00") : t, "yyyy年MM月dd日 hh:mm:ss") + `</div>`, re)
                this.time = bn
            }
        } else {
            if (this.bbn != bn) {
                e = this.addSystemMsg(`<div class="mdui-center">` + new Date().format(t == null ? Date.parse("1000-1-1 00:00:00") : t, "yyyy年MM月dd日 hh:mm:ss") + `</div>`, re)
                this.time = bn
            }
            this.addSystemMsg(temp, re)
        }

        this.bbn = new Date(t).getMinutes()

        return e
    }
    // 从服务器加载一些聊天记录, limit默认=13
    static async loadMsgs(limit) {
        let histroy = await this.getHistroy(this.msgList[0] == null ? null : this.msgList[0].msgid - 1, limit == null ? 13 : limit)
        this.msgList = histroy
    }
    static scrollToBottom() {
        // 吐了啊 原来这样就行了 我何必在子element去整啊
        viewBinding.chatPager.get(0).scrollBy({
            top: 1145141919810,
            behavior: 'smooth'
        })
    }
    // 自动调整使输入框置底 CSS真tm靠不住啊
    static initInputResizer() {
        // 实验表面移动端切出输入法时会触发1-2次resize事件
        // 可以利用这个特性来实现自动滚动文本
        let resize = () => {
            // CSS 牵一发而动全身 因此这个减少的数值是每天都要更改的
            viewBinding.pageChatSeesion.height(window.innerHeight - viewBinding.inputToolbar.height() - $("header.mdui-appbar").height() - viewBinding.chatTab.height() - 65)
            let ledi = this.resizeDick - window.innerHeight
            if (isMobile()) viewBinding.chatPager.get(0).scrollBy({
                // 5.19晚10：56分调配出来的秘方
                // < 0 为窗口变大
                // cnm的，调试十万次就你tm检测不到底是吧，就你语法天天错误是吧
                // 欺负我现在用不了电脑
                top: -(ledi) * ((ledi < 0 && this.isAtBottom()) ? 6 : -1), // (ledi < 0 ? 6 : 6),
                behavior: 'smooth'
            })
            this.resizeDick = window.innerHeight
        }
        window.initInputResizerResize = resize
        window.addEventListener("resize", resize)
        resize()
    }
    // 为消息设置长按/右键事件
    static initMsgElementEvents() {
        let listeners = {}
        let menu
        let callback = (e) => {
            if (menu) menu.close()
            // 从 span 切到 div
            if (e.get(0).tagName.toLowerCase() != "div") e = $(e.get(0).parentNode)
            // 从 消息框 切到 更上层
            e = $(e.get(0).parentNode)
            let menuHtml = $.parseHTML(`<ul class="mdui-menu menu-on-message">
            <li class="mdui-menu-item">
              <a onclick="copyText(\`` + e.find("#msg-content").text() + `\`)" class="mdui-ripple">复制</a>
            </li>
            <li class="mdui-menu-item">
              <a onclick="mdui.alert('未制作功能', '提示', () => { }, { confirmText: '关闭' })" class="mdui-ripple">转发</a>
            </li>
            </ul>`)
            let $menu = $(menuHtml)
            e.before($menu)
            menu = new mdui.Menu(e.get(0), menuHtml, {
                position: "bottom",
                align: "right",
                // covered: true,
            })
            $menu.on('closed.mdui.menu', () => {
                $(menuHtml).remove()
            })
            menu.open()
        }
        viewBinding.pageChatSeesion.on('contextmenu mousedown mouseup', '.message-content', (e) => {
            let eventType = e.type
            let self = $(e.target)

            // 根据事件类型执行不同操作
            switch (eventType) {
                case 'contextmenu':
                    e.preventDefault() // 阻止默认行为
                    callback(self)
                    break
                case 'mousedown':
                    if (!isMobile()) return
                    listeners[self + ""] = setTimeout(() => {
                        callback(self)
                    }, 300) // 300颗够吗 应该够吧
                    break
                case 'mouseup':
                    if (!isMobile()) return
                    clearTimeout(listeners[self + ""])
                    listeners[self + ""] = null
                    break
            }
        })
    }
}

function refreshAll() {
    ContactsList.reloadList()
    delete NickCache.data
    NickCache.data = {}
}

window.User = CurrentUser
window.ContactsList = ContactsList
window.NickCache = NickCache
window.ChatPage = ChatPage
window.ChatMsgAdapter = ChatMsgAdapter
window.refreshAll = refreshAll
