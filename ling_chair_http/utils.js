/* 
 * ©2024 满月叶
 * Github: MoonLeeeaf
 * 辅助添加
 */

// 2024.5.28 睡着了
const sleep = (t) => new Promise((res) => setTimeout(res, t))

const UrlArgs = new URL(location.href).searchParams

// https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html
function isMobile() {
    return ('ontouchstart' in document.documentElement);
}

if (UrlArgs.get("debug")) {
    let script = document.createElement('script')
    script.src = "//cdn.jsdelivr.net/npm/eruda"
    document.body.appendChild(script)
    script.onload = () => eruda.init()
}

// 经常会因为这个指定ID为位置导致一些莫名BUG
if (location.href.includes("#")) location.replace(location.href.substring(0, location.href.indexOf("#")))

const mdui_snackbar = mdui.snackbar
mdui.snackbar = (m) => {
    let t = m
    if (m instanceof Object)
        t = JSON.stringify(m)
    mdui_snackbar(t)
}

const checkEmpty = (i) => {
    if (i instanceof Array) {
        for (let k of i) {
            if (checkEmpty(k)) return true
        }
    }

    return (i == null) || ("" === i) || (0 === i)
}

function escapeHTML(str) {
    return str.replace(/[<>&"']/g, function (match) {
        switch (match) {
            case '<':
                return '&lt;'
            case '>':
                return '&gt;'
            case '&':
                return '&amp;'
            case '"':
                return '&quot;'
            case "'":
                return '&#39;'
            default:
                return match
        }
    })
}

class NData {
    static mount(node) {
        // 便捷获得指定组件
        let es = node.querySelectorAll("[n-id]")
        let ls = {}
        es.forEach((i) => ls[$(i).attr("n-id")] = $(i))

        // input 组件与 localStorage 绑定
        es = node.querySelectorAll("[n-input-ls]")
        es.forEach((e) => {
            let j = $(e)
            j.val(localStorage.getItem(j.attr("n-input-ls")))
            j.blur(() => localStorage.setItem(j.attr("n-input-ls"), j.val()))
        })
        return ls
    }
}

// https://www.runoob.com/w3cnote/javascript-copy-clipboard.html
function copyText(t) {
    let btn = $("[n-id=textCopierBtn]")
    btn.attr("data-clipboard-text", t)
    new ClipboardJS(btn.get(0)).on('success', (e) => {
        e.clearSelection()
    })
    btn.click()
}

// https://zhuanlan.zhihu.com/p/162910462
Date.prototype.format = function (tms, format) {
    let tmd = new Date(tms)
    /*
     * 例子: format="YYYY-MM-dd hh:mm:ss";
     */
    var o = {
        "M+": tmd.getMonth() + 1, // month
        "d+": tmd.getDate(), // day
        "h+": tmd.getHours(), // hour
        "m+": tmd.getMinutes(), // minute
        "s+": tmd.getSeconds(), // second
        "q+": Math.floor((tmd.getMonth() + 3) / 3), // quarter
        "S": tmd.getMilliseconds()
        // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (tmd.getFullYear() + "")
            .substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

// 既然已经有 Notification 了, 那用回中文也不过分吧 :)
class 通知 {
    constructor() {
        this.args = {}
        this.title = ""
    }
    static checkAvailable() {
        return ("Notification" in window)
    }
    static async request() {
        if (!this.checkAvailable()) return false
        return (await Notification.requestPermission())
    }
    setId(id) {
        this.args.tag = id
        return this
    }
    setTitle(t) {
        this.title = t
        return this
    }
    setMessage(m) {
        this.args.body = m
        return this
    }
    setIcon(i) {
        this.args.icon = i
        return this
    }
    setImage(i) {
        this.args.image = i
        return this
    }
    setData(data) {
        this.args.data = data
    }
    show(onclick/*, onclose*/) {
        if (!通知.checkAvailable()) return
        if (localStorage.useNotifications !== "true") return
        let n = new Notification(this.title, this.args)
        n.onclick = onclick == null ? () => n.close() : (n) => onclick(n)
        return n
    }
}

class Hash {
    static md5(data) {
        return CryptoJS.MD5(data).toString(CryptoJS.enc.Base64)
    }
    static sha256(data) {
        return CryptoJS.SHA256(data).toString(CryptoJS.enc.Base64)
    }
}

window.copyText = copyText
window.NData = NData
window.escapeHTML = escapeHTML
window.isMobile = isMobile
window.checkEmpty = checkEmpty
window.sleep = sleep 
window.Hash = Hash
window.通知 = 通知
