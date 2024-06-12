/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 最终执行的杂项
 */

// 感觉 window.attr 比那一堆 import 好用多了

// ================================
//             正文开始
// ================================

// 没有刷新令牌需要重新登录 或者初始化
if (!localStorage.refreshToken || localStorage.refreshToken === "")
    localStorage.isSignIn = false

if (!localStorage.server || localStorage.server === "")
    setUpClient()
else
    setUpClient(localStorage.server)

// 登录到账号
let dialogSignIn
// 谨防 localStorage 字符串数据大坑
if (localStorage.isSignIn == "false")
    dialogSignIn = new mdui.Dialog(viewBinding.dialogSignIn.get(0), {
        modal: true,
        closeOnEsc: false,
        history: false,
    }).open()
else {
    (async () => viewBinding.userNick.text(await NickCache.getNick(localStorage.userName)))()
    let hello
    let nowHour = new Date().getHours()
    if (nowHour >= 6 && nowHour <= 11) hello = "早安"
    else if (nowHour == 12) hello = "中午好"
    else if (nowHour >= 13 && nowHour <= 18) hello = "下午好"
    else if (nowHour >= 19 && nowHour < 22) hello = "晚上好"
    else hello = "晚安"
    viewBinding.helloText.text(hello)

    viewBinding.userHead.attr("src", CurrentUser.getUserHeadUrl(localStorage.userName))

    ContactsList.reloadList()

    CurrentUser.registerCallback()
}

// 感谢AI的力量
Stickyfill.add($("*").filter((a, b) => $(b).css('position') === 'sticky'))

ChatMsgAdapter.initMsgElementEvents()

ChatMsgAdapter.initInputResizer()

const showLinkDialog = (link) => mdui.alert(decodeURI(link) + "<br/>如果你确认此链接是安全的, 那么请<a class=\"mdui-text-color-theme-accent\" href=\"" + link + "\">点我</a>", '链接', () => { }, { confirmText: "关闭" })

const showImageDialog = (link, id, alt) => mdui.alert(`此图片链接来源未知: ${decodeURI(link)}<br/>如果你希望加载, 请<a class="mdui-text-color-theme-accent" mdui-dialog-close onclick="$('#${id}').html('<img src=\\'${link}\\' alt=\\'${decodeURI(alt)}\\' class=\\'message-image\\'></img>')">点我</a>`, '外部图片', () => { }, { confirmText: "关闭" })

const showCodeDialog = (code) => mdui.alert(`<pre><code>${decodeURI(code)}</code></pre>`, '代码块', () => { }, { confirmText: "关闭" })

const renderer = {
    heading(text, level) {
        return text
    },
    paragraph(text) {
        return text
    },
    blockquote(text) {
        return text
    },
    link(href, title, text) {
        return `<a class="mdui-text-color-theme-accent" onclick="showLinkDialog('${encodeURI(href)}')">[链接] ${text}</a>`
    },
    image(href, title, text) {
        let h = Hash.sha256(href)
        let out = true
        try {
            out = new URL(href).hostname === new URL(location.href)
        } catch(e) {}
        if (out)
            return `<img src="${encodeURI(href)}" alt="${text}" class="message-image"></img>`
        else
            return `<div id="${h}"><a class="mdui-text-color-theme-accent" onclick="showImageDialog('${encodeURI(href)}', '${h}', '${encodeURI(text)}')">[外部图片] ${text}</a></div>`
    },
    code(src) {
        return `<a class="mdui-text-color-theme-accent" onclick="showCodeDialog(\`${encodeURI(src)}\`)">[代码块]</a>`
    },
}

marked.use({
    gfm: true,
    renderer: renderer,
    async: true,
})


