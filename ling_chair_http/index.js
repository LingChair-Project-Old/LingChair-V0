/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 最终执行的杂项
 */

// 感觉 window.attr 比那一堆 import 好用多了

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

    viewBinding.userHead.attr("src", User.getUserHeadUrl(localStorage.userName))

    ContactsList.reloadList()

    User.registerCallback()
}

// 感谢AI的力量
Stickyfill.add($("*").filter((a, b) => $(b).css('position') === 'sticky'))

ChatMsgAdapter.initMsgElementEvents()

ChatMsgAdapter.initInputResizer()
