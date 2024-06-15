/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 业务逻辑
 */

// ================================
//             当前用户
// ================================

class CurrentUser {
    /** @type { String } */
    static myAccessToken
    /**
     * 登录账号
     * @param { String } name 
     * @param { String } passwd 
     * @param { Function } callback
     */
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
    /**
     * 注册账号
     * @param { String } name 
     * @param { String } passwd 
     * @param { Function } callback
     */
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
    /**
     * 登录对话框中的登录逻辑
     * @param { String } name 
     * @param { String } passwd
     */
    static signInWithDialog(name, passwd) {
        this.signIn(name, passwd, (re) => {
            localStorage.refreshToken = re.data.refreshToken
            localStorage.isSignIn = true

            location.reload()
        })
    }
    /**
     * 设置昵称
     * @param { String } nick
     * @param { Function } callback
     */
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
    /**
     * 获取用户头像的链接
     * @param { String } name
     * @returns { String } headImageUrl
     */
    static getUserHeadUrl(name) {
        return client.io.uri + "/users_head/" + name + ".png"
    }
    /**
     * 获取访问密钥
     * @param { String } name 
     * @returns { Promise<String> } accessToken
     */
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
    /**
     * 请求上传头像
     */
    static uploadHeadImage() {
        viewBinding.uploadHeadImage.click()
    }
    /**
     * 上传头像回调事件
     * @param { Element } element 
     */
    static async uploadHeadImageCallback(self) {
        let img = self.files[0]
        client.emit("user.setHeadImage", {
            name: localStorage.userName,
            accessToken: await CurrentUser.getAccessToken(),
            headImage: img,
        }, (re) => mdui.snackbar(re.msg))
    }
    /**
     * 验证用户
     */
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
    /**
     * 登出并重载页面
     */
    static signOutAndReload() {
        localStorage.refreshToken = ""
        localStorage.isSignIn = false

        setTimeout(() => location.reload(), 300)
    }
    /**
     * 注册客户端回调事件
     */
    static registerCallback() {
        client.on("msg.receive", async (a) => {
            if (checkEmpty([a.target, a.msg, a.type]))
                return

            let currentPage = ChatPage.getCurrentChatPage()

            if ((currentPage.chatTarget === a.target) && (currentPage.chatType === a.type)) {
                let i = ChatMsgAdapter.isAtBottom()
                await currentPage.addMsg(a.target, a.msg.msg, a.msg.time, false, a.msg.msgid)
                if (i) ChatMsgAdapter.scrollToBottom()
            }

            if (currentPage.chatTarget !== localStorage.userName) {
                let n = new 通知().setTitle("" + await NickCache.getNick(a.target)).setMessage(a.msg.msg).setIcon(CurrentUser.getUserHeadUrl(a.target)).show(async () => {
                    await ChatMsgAdapter.switchTo(a.target, a.type)
                    location.replace("#msgid_" + a.msg.msgid)
                    n.close()
                })
            }
        })
    }
    /**
     * 打开资料卡
     * @param { String } name
     */
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
    /**
     * 获取昵称
     * @param { String } name
     * @returns { String } nick
     */
    static async getNick(name) {
        return await new Promise((res, _rej) => {
            // 这个this别摆着不放啊 不然两下就会去世
            let nick = NickCache.data[name]
            if (nick == null)
                client.emit("user.getNick", { name: name }, (re) => {
                    let nk = re.data != null ? re.data.nick : name
                    if (nk == null) nk = name
                    NickCache.data[name] = nk
                    res(nk)
                })
            else
                res(nick)
        })
    }
}

// ================================
//              联系人
// ================================

class ContactsList {
    /**
     * 重载联系人列表
     */
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
                $($.parseHTML(`<li class="mdui-list-item mdui-ripple" mdui-drawer-close><div class="mdui-list-item-avatar"><img src="${CurrentUser.getUserHeadUrl(name)}" onerror="this.src='res/default_head.png'" /></div><div class="mdui-list-item-content">` + dick + `</div></li>`)).appendTo(viewBinding.contactsList).click(() => {
                    ChatMsgAdapter.switchTo(name, "single")
                })
            }

        })
    }
    /**
     * 添加联系人/群峦
     * @param { String } nameOrId
     */
    static async add(name, type) {
        if (type == "single") {
            client.emit("user.addFriend", {
                name: localStorage.userName,
                target: name,
                accessToken: await CurrentUser.getAccessToken(),
            }, async (re) => {
                // if (re.code !== 0)
                return mdui.snackbar(re.msg)
            })
        }
    }
    /**
     * 打开添加联系人的对话框
     */
    static openAddDialog() {
        new mdui.Dialog(viewBinding.dialogNewContact.get(0)).open()
    }
}

// ================================
//             消息核心
// ================================

class ChatTabManager {
    static tabs = {}
    /**
     * 添加Tab
     * @param { String } title
     * @param { String } target
     */
    static add(title, target) {
        $($.parseHTML(`<a onclick="ChatMsgAdapter.switchTo('${target}');" tag="chatTab" id="chatTab_${target}" class="mdui-ripple" style="text-transform: none;">${title}</a>`)).appendTo(viewBinding.chatTab)
    }
    /**
     * 寻找Tab
     * @param { String } target
     * @returns { jQuery } element
     */
    static find(target) {
        return $("#chatTab_" + target)
    }
    /**
     * 点击Tab
     * @param { String } target
     */
    static click(target) {
        this.find(this.target).click()
    }
    /**
     * 删除Tab
     * @param { String } target
     */
    static remove(target) {
        this.find(target).remove()
    }
}

class ChatPage {
    static cached = {}
    constructor(name, title, type) {
        this.chatTarget = name
        this.chatType = type
        ChatTabManager.add(title, this.chatTarget)
        this.chatPageElement = $($.parseHTML(`<div class="chat-seesion" id="chatPageTargetIs${this.chatTarget}" target="${this.chatTarget}"></div>`))
        this.chatPageElement.hide()
        this.chatPageElement.appendTo(viewBinding.pageChatSeesion)
        ;(async () => await this.loadMore())()
    }
    /**
     * 获取当前的聊天栏
     * @returns { jQuery }
     */
    static getCurrentChatSeesion() {
        return $(".chat-seesion[actived=true]")
    }
    /**
     * 获取当前聊天页面
     * @returns { ChatPage }
     */
    static getCurrentChatPage(name) {
        return ChatPage.cached[$(".chat-seesion[actived=true]").attr("target")]
    }
    /**
     * 切换选择的聊天对象
     */
    async show() {
        ChatTabManager.click(this.chatTarget)

        this.minMsgId = null

        for (let k of Object.keys(ChatPage.cached)) {
            let cpe = ChatPage.cached[k].chatPageElement
            cpe.attr("actived", null)
            cpe.hide()
            let tbe = ChatTabManager.find(k)
            tbe.removeClass("mdui-tab-active")
        }

        $(this.chatPageElement).attr("actived", "true")
        
        ChatTabManager.find(this.chatTarget).addClass("mdui-tab-active")
    
        
        $(this.chatPageElement).show()
    }
    /**
     * 连带Tab一起销毁
     */
    remove() {
        ChatTabManager.remove(this.chatTarget)
        ChatPage.cached[this.chatTarget].chatPageElement.remove()
        ChatPage.cached[this.chatTarget] = null
    }
    /**
     * 加载更多聊天记录
     * @param { int } 加载数量
     */
    async loadMore(limit) {
        let histroy = await this.getHistroy(this.minMsgId, limit == null ? 13 : limit)
        let chatPager = viewBinding.chatPager.get(0)

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
            sc = sc + (e == null ? 35 : getOffsetTop(chatPager, e.get(0)))
        }
        chatPager.scrollBy({
            top: sc,
            behavior: 'smooth'
        })
    }
    /**
     * 获取聊天消息记录
     * @param { int } 起始点
     * @param { int } 获取数量
     */
    async getHistroy(start, limit) {
        if (this.chatType == "single")
            return new Promise(async (res, _rej) => {
                client.emit("user.getSingleChatHistroy", {
                    name: localStorage.userName,
                    target: this.chatTarget,
                    limit: limit,
                    accessToken: await CurrentUser.getAccessToken(),
                    startId: start,
                }, (re) => {
                    if (re.code !== 0)
                        return mdui.snackbar(re.msg)
                    res(re.data.histroy)
                })
            })
        throw new TypeError("Unsupported chat type!")
    }
    /**
     * 发送消息
     * @param { String } msg
     */
    async send(msg) {
        if (this.chatType == "single")
            client.emit("user.sendSingleMsg", {
                name: localStorage.userName,
                target: this.chatTarget,
                msg: msg,
                accessToken: await CurrentUser.getAccessToken(),
            }, async (re) => {
                if (re.code !== 0)
                    return mdui.snackbar(re.msg)

                viewBinding.inputMsg.val("")

                // 微机课闲的没事干玩玩 发现私聊会多发一个(一个是本地的, 另一个是发送成功的) 选择一个关掉就好了
                // 这里我选择服务端不发送回调, 不然多设备同步会吵死
                // 错了 应该是客户端少发条才对 不然不能多设备同步
                if (this.chatTarget !== localStorage.userName) {
                    let i = ChatMsgAdapter.isAtBottom()
                    await this.addMsg(localStorage.userName, msg, re.data.time, false, re.data.msgid)
                    if (i) ChatMsgAdapter.scrollToBottom()
                }
            })
        throw new TypeError("Unsupported chat type!")
    }
    /**
     * 添加系统消息
     * @param { String } 消息
     * @param { Boolean } 是否加到顶部
     * @returns { jQuery } 消息元素
     */
    addSystemMsg(msg, addToTop) {
        let element
        if (addToTop)
            // 加到头部
            element = $($.parseHTML(msg)).prependTo(this.chatPageElement)
        else
            // 加到尾部
            element = $($.parseHTML(msg)).appendTo(this.chatPageElement)
        return element
    }
    /**
     * 添加聊天记录
     * @param { String } name
     * @param { String } msg
     * @param { String } type 
     * @param { Boolean } 是否加到头部
     * @param { String || int } 消息id
     * @returns { jQuery } 消息元素
     */
    async addMsg(name, preMsg, time, addToTop, msgid) {

        let nick = await NickCache.getNick(name) // re.data == null ? name : re.data.nick

        let msg

        try {
            msg = await marked.parse(preMsg)
        } catch (error) {
            console.log("解析消息失败: " + error)
            msg = escapeHTML(preMsg)
        }

        let temp
        if (name === localStorage.userName)
            temp = `<div class="chat-message-right">
                <div class="message-content-with-nickname-right">
                <span class="nickname">${nick}</span>
                <div class="message-content mdui-card" tag="msg-card" id="msgid_${msgid}">
                <span id="msg-content">${msg}</span>
                <pre class="mdui-hidden" id="raw-msg-content">${preMsg}</pre>
                </div>
                </div>
                <img class="avatar" src="${CurrentUser.getUserHeadUrl(name)}" onerror="this.src='res/default_head.png'" />
                </div>`
        else
            temp = `<div class="chat-message-left">
                <img class="avatar" src="${CurrentUser.getUserHeadUrl(name)}" onerror="this.src='res/default_head.png'" />
                <div class="message-content-with-nickname-left">
                <span class="nickname">${nick}</span>
                <div class="message-content mdui-card" tag="msg-card" id="msgid_${msgid}">
                <span id="msg-content">${msg}</span>
                <pre class="mdui-hidden" id="raw-msg-content">${preMsg}</pre>
                </div>
                </div>
                </div>`

        let nowMinutes = new Date(time).getMinutes()
        let msgElement
        if (addToTop) {
            this.addSystemMsg(temp, addToTop)
            if (this.minutesCache != nowMinutes) {
                msgElement = this.addSystemMsg(`<div class="mdui-center">${new Date().format(time == null ? Date.parse("1000-1-1 00:00:00") : time, "yyyy年MM月dd日 hh:mm:ss")}</div>`, addToTop)
                this.time = nowMinutes
            }
        } else {
            if (this.minutesCache != nowMinutes) {
                msgElement = this.addSystemMsg(`<div class="mdui-center">${new Date().format(time == null ? Date.parse("1000-1-1 00:00:00") : time, "yyyy年MM月dd日 hh:mm:ss")}</div>`, addToTop)
                this.time = nowMinutes
            }
            this.addSystemMsg(temp, addToTop)
        }

        this.minutesCache = new Date(time).getMinutes()

        return msgElement
    }
}

class ChatMsgAdapter {
    static type
    static target
    static resizeDick
    /**
     * 切换到某一个聊天对象
     * @param { String } name
     * @param { String } type
     */
    static async switchTo(name, type) {
        if (!ChatPage.cached[name])
            ChatPage.cached[name] = new ChatPage(name, await NickCache.getNick(name), type)

        ChatPage.cached[name].show()
    }
    /**
     * 是否在底部
     * @returns { Boolean } 是否在底部
     */
    static isAtBottom() {
        let elementRect = viewBinding.pageChatSeesion.get(0).getBoundingClientRect()
        return (elementRect.bottom <= window.innerHeight)
    }
    /**
     * 滑到底部
     */
    static scrollToBottom() {
        // 吐了啊 原来这样就行了 我何必在子element去整啊
        viewBinding.chatPager.get(0).scrollBy({
            top: 1145141919810,
            behavior: 'smooth'
        })
    }
    /**
     * 初始化输入框位置调整器
     */
    static initInputResizer() {
        // 实验表面移动端切出输入法时会触发1-2次resize事件
        // 可以利用这个特性来实现自动滚动文本
        let resize = () => {
            // CSS 牵一发而动全身 因此这个减少的数值是每天都要更改的
            viewBinding.chatPager.height(window.innerHeight - viewBinding.inputToolbar.height() - $("header.mdui-appbar").height() - viewBinding.chatTab.height() - 17)
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
    /**
     * 初始化消息框右击事件
     */
    static initMsgElementEvents() {
        let listeners = {}
        let menu
        let callback = (e) => {
            if (menu) menu.close()
            // 切到 div.message-content
            let ele = e.get(0)
            while ($(ele).attr("tag") != "msg-card")
                ele = ele.parentNode
            e = $(ele)
            let menuHtml = $.parseHTML(`<ul class="mdui-menu menu-on-message">
            <li class="mdui-menu-item">
              <a onclick="copyText(\`${e.find("#msg-content").text()}\`)" class="mdui-ripple">复制</a>
            </li>
            <li class="mdui-menu-item">
              <a onclick="mdui.alert(\`${e.find("#raw-msg-content").text()}\`, '消息原文', () => { }, { confirmText: '关闭' })" class="mdui-ripple">原文</a>
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

/**
 * 刷新联系人列表以及昵称缓存
 */
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
