"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
/*
 * 铃之椅 - 把选择权还给用户, 让聊天权掌握在用户手中
 * Copyright 2024 满月叶
 * GitHub: https://github.com/MoonLeeeaf/LingChair-Web-Client
 * 本项目使用 Apache 2.0 协议开源
 * 
 * Copyright 2024 MoonLeeeaf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var UrlArgs = new URL(location.href).searchParams;

// https://www.ruanyifeng.com/blog/2021/09/detecting-mobile-browser.html
function isMobile() {
  return 'ontouchstart' in document.documentElement;
}
function setOnRightClick(e, cb) {
  if (!(e instanceof jQuery)) e = $(e);
  var longPressTimer;
  if (!cb) throw new Error("定义回调!!!!");
  e.on('contextmenu', function (e) {
    e.preventDefault(); // 阻止默认右键菜单
    cb();
  });
  e.on('mousedown', function () {
    longPressTimer = setTimeout(function () {
      cb();
    }, 1000);
  });
  e.on('mouseup', function () {
    clearTimeout(longPressTimer);
  });
}
if (UrlArgs.get("debug")) {
  var script = document.createElement('script');
  script.src = "//cdn.jsdelivr.net/npm/eruda";
  document.body.appendChild(script);
  script.onload = function () {
    return eruda.init();
  };
}

// 经常会因为这个指定ID为位置导致一些莫名BUG
if (location.href.includes("#")) location.replace(location.href.substring(0, location.href.indexOf("#")));
var mdui_snackbar = mdui.snackbar;
mdui.snackbar = function (m) {
  var t = m;
  if (m instanceof Object) t = JSON.stringify(m);
  mdui_snackbar(t);
};
var checkEmpty = function checkEmpty(i) {
  if (i instanceof Array) {
    var _iterator = _createForOfIteratorHelper(i),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var k = _step.value;
        if (checkEmpty(k)) return true;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return i == null || "" === i || 0 === i;
};
function escapeHTML(str) {
  return str.replace(/[<>&"']/g, function (match) {
    switch (match) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case '"':
        return '&quot;';
      case "'":
        return '&#39;';
      default:
        return match;
    }
  });
}
var NData = /*#__PURE__*/function () {
  function NData() {
    _classCallCheck(this, NData);
  }
  return _createClass(NData, null, [{
    key: "mount",
    value: function mount(node) {
      // 便捷获得指定组件
      var es = node.querySelectorAll("[n-id]");
      var ls = {};
      es.forEach(function (i) {
        return ls[$(i).attr("n-id")] = $(i);
      });

      // input 组件与 localStorage 绑定
      es = node.querySelectorAll("[n-input-ls]");
      es.forEach(function (e) {
        var j = $(e);
        j.val(localStorage.getItem(j.attr("n-input-ls")));
        j.blur(function () {
          return localStorage.setItem(j.attr("n-input-ls"), j.val());
        });
      });
      return ls;
    }
  }]);
}(); // 快捷获取指定视图
var viewBinding = NData.mount($("#app").get(0));
$.ajax({
  url: "res/config.json",
  dataType: "json",
  success: function success(c) {
    viewBinding.appTitle.text(c.appTitle);
    if (!c.canChangeServer) {
      viewBinding.dialogSignInServerLabel.hide();
      viewBinding.drawerChangeServer.hide();
    }
  }
});

/* // Toolbar 快捷按钮绑定
viewBinding.contactsRefresh.hide()
viewBinding.contactsAdd.hide()
viewBinding.tabChatList.on("show.mdui.tab", () => {
    viewBinding.contactsRefresh.hide()
    viewBinding.contactsAdd.hide()
})
viewBinding.tabContacts.on("show.mdui.tab", () => {
    viewBinding.contactsRefresh.show()
    viewBinding.contactsAdd.show()
})
viewBinding.tabChatSeesion.on("show.mdui.tab", () => {
    viewBinding.contactsRefresh.hide()
    viewBinding.contactsAdd.hide()
}) */

/* viewBinding.tabChatSeesion.hide() */

// 关于页面
viewBinding.menuAbout.click(function () {
  return mdui.alert('这是一个开源项目<br/>作者: MoonLeeeaf<br/>欢迎访问我们的<a class="mdui-text-color-theme-accent" href="https://github.com/LingChair/LingChair">项目主页</a>', '关于 铃之椅', function () {}, {
    confirmText: "关闭"
  });
});
viewBinding.drawerChangeServer.click(function () {
  mdui.prompt('输入服务器地址...(为空则使用当前页面地址)', function (value) {
    localStorage.server = value;
    mdui.snackbar("更新成功, 刷新页面生效");
  }, function () {}, {
    confirmText: "确定",
    cancelText: "取消"
  });
});
viewBinding.drawerSignOut.click(function () {
  mdui.confirm('确定要登出账号吗', function () {
    User.signOutAndReload();
  }, function () {}, {
    confirmText: "确定",
    cancelText: "取消"
  });
});
viewBinding.sendMsg.click(function (a) {
  var text = viewBinding.inputMsg.val();
  if (text.trim() !== "") ChatMsgAdapter.send(text);
});
viewBinding.inputMsg.keydown(function (e) {
  if (e.ctrlKey && e.keyCode === 13) viewBinding.sendMsg.click();
});
viewBinding.dialogSignInPasswd.keydown(function (e) {
  if (e.keyCode === 13) viewBinding.dialogSignInEnter.click();
});
viewBinding.switchNotifications.click(function (a) {
  if ((localStorage.useNotifications == "true" || localStorage.useNotifications != null) && localStorage.useNotifications != "false") {
    localStorage.useNotifications = "false";
    viewBinding.switchNotificationsIcon.text("notifications_off");
  } else {
    localStorage.useNotifications = "true";
    viewBinding.switchNotificationsIcon.text("notifications");
  }
});
if (localStorage.useNotifications == "true") viewBinding.switchNotificationsIcon.text("notifications");

// https://www.runoob.com/w3cnote/javascript-copy-clipboard.html
function copyText(t) {
  var btn = viewBinding.textCopierBtn;
  btn.attr("data-clipboard-text", t);
  new ClipboardJS(btn.get(0)).on('success', function (e) {
    e.clearSelection();
  });
  btn.click();
}

// https://zhuanlan.zhihu.com/p/162910462
Date.prototype.format = function (tms, format) {
  var tmd = new Date(tms);
  /*
   * 例子: format="YYYY-MM-dd hh:mm:ss";
   */
  var o = {
    "M+": tmd.getMonth() + 1,
    // month
    "d+": tmd.getDate(),
    // day
    "h+": tmd.getHours(),
    // hour
    "m+": tmd.getMinutes(),
    // minute
    "s+": tmd.getSeconds(),
    // second
    "q+": Math.floor((tmd.getMonth() + 3) / 3),
    // quarter
    "S": tmd.getMilliseconds()
    // millisecond
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (tmd.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }
  }
  return format;
};

// new mdui.Drawer('#main-drawer').close()
var NickCache = /*#__PURE__*/function () {
  function NickCache() {
    _classCallCheck(this, NickCache);
  }
  return _createClass(NickCache, null, [{
    key: "getNick",
    value: function () {
      var _getNick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(name) {
        var _this = this;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return new Promise(function (res, rej) {
                // 这个this别摆着不放啊 不然两下就会去世
                var nick = _this.data[name];
                if (nick == null) client.emit("user.getNick", {
                  name: localStorage.userName
                }, function (re) {
                  var nk = re.data != null ? re.data.nick : name;
                  if (nk == null) nk = name;
                  _this.data[name] = nk;
                  res(nk);
                });else res(nick);
              });
            case 2:
              return _context.abrupt("return", _context.sent);
            case 3:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getNick(_x) {
        return _getNick.apply(this, arguments);
      }
      return getNick;
    }()
  }]);
}(); // 既然已经有 Notification 了, 那用回中文也不过分吧 :)
_defineProperty(NickCache, "data", {});
var 通知 = /*#__PURE__*/function () {
  function 通知() {
    _classCallCheck(this, 通知);
    this.args = {};
    this.title = "";
  }
  return _createClass(通知, [{
    key: "setId",
    value: function setId(id) {
      this.args.tag = id;
      return this;
    }
  }, {
    key: "setTitle",
    value: function setTitle(t) {
      this.title = t;
      return this;
    }
  }, {
    key: "setMessage",
    value: function setMessage(m) {
      this.args.body = m;
      return this;
    }
  }, {
    key: "setIcon",
    value: function setIcon(i) {
      this.args.icon = i;
      return this;
    }
  }, {
    key: "setImage",
    value: function setImage(i) {
      this.args.image = i;
      return this;
    }
  }, {
    key: "setData",
    value: function setData(data) {
      this.args.data = data;
    }
  }, {
    key: "show",
    value: function show(onclick /*, onclose*/) {
      if (!通知.checkAvailable()) return;
      if (localStorage.useNotifications !== "true") return;
      var n = new Notification(this.title, this.args);
      n.onclick = onclick == null ? function () {
        return n.close();
      } : function (n) {
        return onclick(n);
      };
      // n.onclose = onclose
      // n.close()
      return n;
    }
  }], [{
    key: "checkAvailable",
    value: function checkAvailable() {
      return "Notification" in window;
    }
  }, {
    key: "request",
    value: function () {
      var _request = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              if (this.checkAvailable()) {
                _context2.next = 2;
                break;
              }
              return _context2.abrupt("return", false);
            case 2:
              _context2.next = 4;
              return Notification.requestPermission();
            case 4:
              return _context2.abrupt("return", _context2.sent);
            case 5:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function request() {
        return _request.apply(this, arguments);
      }
      return request;
    }()
  }]);
}();
var ContactsList = /*#__PURE__*/function () {
  function ContactsList() {
    _classCallCheck(this, ContactsList);
  }
  return _createClass(ContactsList, null, [{
    key: "reloadList",
    value: function () {
      var _reloadList = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        return _regeneratorRuntime().wrap(function _callee4$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.t0 = client;
              _context5.t1 = localStorage.userName;
              _context5.next = 4;
              return User.getAccessToken();
            case 4:
              _context5.t2 = _context5.sent;
              _context5.t3 = {
                name: _context5.t1,
                accessToken: _context5.t2
              };
              _context5.t4 = /*#__PURE__*/function () {
                var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(re) {
                  var ls, _loop, index;
                  return _regeneratorRuntime().wrap(function _callee3$(_context4) {
                    while (1) switch (_context4.prev = _context4.next) {
                      case 0:
                        if (!(re.code !== 0)) {
                          _context4.next = 2;
                          break;
                        }
                        return _context4.abrupt("return", mdui.snackbar(re.msg));
                      case 2:
                        viewBinding.contactsList.empty();
                        ls = re.data.friends;
                        _loop = /*#__PURE__*/_regeneratorRuntime().mark(function _loop() {
                          var name, dick;
                          return _regeneratorRuntime().wrap(function _loop$(_context3) {
                            while (1) switch (_context3.prev = _context3.next) {
                              case 0:
                                name = ls[index];
                                _context3.next = 3;
                                return NickCache.getNick(name);
                              case 3:
                                dick = _context3.sent;
                                /*client.emit("user.getNick", { name: localStorage.userName }, (re) => {
                                    let nick = re.data == null ? re.data.nick : null
                                    let name = ls[index]*/
                                $($.parseHTML("<li class=\"mdui-list-item mdui-ripple\"><div class=\"mdui-list-item-avatar\"><img src=\"" + User.getUserHeadUrl(name) + "\" onerror=\"this.src='res/default_head.png'\" /></div><div class=\"mdui-list-item-content\">" + dick + "</div></li>")).appendTo(viewBinding.contactsList).click(function () {
                                  ChatMsgAdapter.switchTo(name, "single");
                                });
                                //})
                              case 5:
                              case "end":
                                return _context3.stop();
                            }
                          }, _loop);
                        });
                        _context4.t0 = _regeneratorRuntime().keys(ls);
                      case 6:
                        if ((_context4.t1 = _context4.t0()).done) {
                          _context4.next = 11;
                          break;
                        }
                        index = _context4.t1.value;
                        return _context4.delegateYield(_loop(), "t2", 9);
                      case 9:
                        _context4.next = 6;
                        break;
                      case 11:
                      case "end":
                        return _context4.stop();
                    }
                  }, _callee3);
                }));
                return function (_x2) {
                  return _ref.apply(this, arguments);
                };
              }();
              _context5.t0.emit.call(_context5.t0, "user.getFriends", _context5.t3, _context5.t4);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee4);
      }));
      function reloadList() {
        return _reloadList.apply(this, arguments);
      }
      return reloadList;
    }() // 添加联系人，好友或者群聊
  }, {
    key: "add",
    value: function add(name, type) {
      if (type == "single") {}
    }
  }, {
    key: "openAddDialog",
    value: function openAddDialog() {
      new mdui.Dialog(viewBinding.dialogNewContact.get(0)).open();
    }
  }]);
}(); // 第一次写前端的消息加载, 代码很乱, 还请原谅~
// v0.7.0 大改UI 畏惧了 太庞大了
var ChatPage = /*#__PURE__*/function () {
  function ChatPage(name, type) {
    _classCallCheck(this, ChatPage);
  }
  return _createClass(ChatPage, null, [{
    key: "switchTo",
    value: function switchTo(name, type) {
      if (!this.cached[name]) this.cached[name] = new ChatPage(name, type);
    }
  }]);
}();
_defineProperty(ChatPage, "cached", {});
var ChatMsgAdapter = /*#__PURE__*/function () {
  function ChatMsgAdapter() {
    _classCallCheck(this, ChatMsgAdapter);
  }
  return _createClass(ChatMsgAdapter, null, [{
    key: "switchTo",
    value: // 切换聊天对象
    function () {
      var _switchTo = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(name, type) {
        return _regeneratorRuntime().wrap(function _callee5$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              viewBinding.tabChatSeesion.show();
              _context6.t0 = viewBinding.tabChatSeesion;
              _context6.next = 4;
              return NickCache.getNick(name);
            case 4:
              _context6.t1 = _context6.sent;
              _context6.t0.text.call(_context6.t0, _context6.t1);
              viewBinding.tabChatSeesion.get(0).click();
              this.type = type;
              this.target = name;
              // this.msgList = []
              this.minMsgId = null;
              viewBinding.pageChatSeesion.empty();
              _context6.next = 13;
              return this.loadMore();
            case 13:
              this.scrollToBottom();
            case 14:
            case "end":
              return _context6.stop();
          }
        }, _callee5, this);
      }));
      function switchTo(_x3, _x4) {
        return _switchTo.apply(this, arguments);
      }
      return switchTo;
    }() // 发送消息
  }, {
    key: "send",
    value: function () {
      var _send = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7(msg) {
        return _regeneratorRuntime().wrap(function _callee7$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.t0 = client;
              _context8.t1 = localStorage.userName;
              _context8.t2 = this.target;
              _context8.t3 = msg;
              _context8.next = 6;
              return User.getAccessToken();
            case 6:
              _context8.t4 = _context8.sent;
              _context8.t5 = {
                name: _context8.t1,
                target: _context8.t2,
                msg: _context8.t3,
                accessToken: _context8.t4
              };
              _context8.t6 = /*#__PURE__*/function () {
                var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6(re) {
                  var i;
                  return _regeneratorRuntime().wrap(function _callee6$(_context7) {
                    while (1) switch (_context7.prev = _context7.next) {
                      case 0:
                        if (!(re.code !== 0)) {
                          _context7.next = 2;
                          break;
                        }
                        return _context7.abrupt("return", mdui.snackbar(re.msg));
                      case 2:
                        viewBinding.inputMsg.val("");

                        // 微机课闲的没事干玩玩 发现私聊会多发一个(一个是本地的, 另一个是发送成功的) 选择一个关掉就好了
                        // 这里我选择服务端不发送回调, 不然多设备同步会吵死
                        // 错了 应该是客户端少发条才对 不然不能多设备同步
                        if (!(ChatMsgAdapter.target !== localStorage.userName && ChatMsgAdapter.type === "single")) {
                          _context7.next = 8;
                          break;
                        }
                        i = ChatMsgAdapter.isAtBottom();
                        _context7.next = 7;
                        return ChatMsgAdapter.addMsg(localStorage.userName, msg, re.data.time, re.data.msgid);
                      case 7:
                        if (i) ChatMsgAdapter.scrollToBottom();
                      case 8:
                      case "end":
                        return _context7.stop();
                    }
                  }, _callee6);
                }));
                return function (_x6) {
                  return _ref2.apply(this, arguments);
                };
              }();
              _context8.t0.emit.call(_context8.t0, "user.sendSingleMsg", _context8.t5, _context8.t6);
            case 10:
            case "end":
              return _context8.stop();
          }
        }, _callee7, this);
      }));
      function send(_x5) {
        return _send.apply(this, arguments);
      }
      return send;
    }()
  }, {
    key: "getHistroy",
    value: function () {
      var _getHistroy = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(start, limit) {
        var _this2 = this;
        return _regeneratorRuntime().wrap(function _callee9$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              return _context10.abrupt("return", new Promise( /*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(res, rej) {
                  return _regeneratorRuntime().wrap(function _callee8$(_context9) {
                    while (1) switch (_context9.prev = _context9.next) {
                      case 0:
                        _context9.t0 = client;
                        _context9.t1 = localStorage.userName;
                        _context9.t2 = _this2.target;
                        _context9.t3 = limit;
                        _context9.next = 6;
                        return User.getAccessToken();
                      case 6:
                        _context9.t4 = _context9.sent;
                        _context9.t5 = start;
                        _context9.t6 = {
                          name: _context9.t1,
                          target: _context9.t2,
                          limit: _context9.t3,
                          accessToken: _context9.t4,
                          startId: _context9.t5
                        };
                        _context9.t7 = function (re) {
                          if (re.code !== 0) return mdui.snackbar(re.msg);
                          res(re.data.histroy);
                        };
                        _context9.t0.emit.call(_context9.t0, "user.getSingleChatHistroy", _context9.t6, _context9.t7);
                      case 11:
                      case "end":
                        return _context9.stop();
                    }
                  }, _callee8);
                }));
                return function (_x9, _x10) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
            case "end":
              return _context10.stop();
          }
        }, _callee9);
      }));
      function getHistroy(_x7, _x8) {
        return _getHistroy.apply(this, arguments);
      }
      return getHistroy;
    }()
  }, {
    key: "loadMore",
    value: function () {
      var _loadMore = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee10(limit) {
        var histroy, re, sc, index, i, e;
        return _regeneratorRuntime().wrap(function _callee10$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.getHistroy(this.minMsgId, limit == null ? 13 : limit);
            case 2:
              histroy = _context11.sent;
              if (!(histroy.length == 0)) {
                _context11.next = 5;
                break;
              }
              return _context11.abrupt("return", mdui.snackbar("已经加载完了~"));
            case 5:
              re = this.minMsgId != null;
              this.minMsgId = histroy[0].msgid - 1;
              sc = 0;
              if (re) histroy = histroy.reverse();
              _context11.t0 = _regeneratorRuntime().keys(histroy);
            case 10:
              if ((_context11.t1 = _context11.t0()).done) {
                _context11.next = 19;
                break;
              }
              index = _context11.t1.value;
              i = histroy[index];
              _context11.next = 15;
              return this.addMsg(i.name, i.msg, i.time, re, i.msgid);
            case 15:
              e = _context11.sent;
              // 因为某些因素直接DEBUG到吐血 断点继续都不报错 原因不明
              sc = sc + (e == null ? 25 : e.get(0).offsetTop);
              _context11.next = 10;
              break;
            case 19:
              window.scrollBy({
                top: sc,
                behavior: 'smooth'
              });
            case 20:
            case "end":
              return _context11.stop();
          }
        }, _callee10, this);
      }));
      function loadMore(_x11) {
        return _loadMore.apply(this, arguments);
      }
      return loadMore;
    }()
  }, {
    key: "addSystemMsg",
    value: function addSystemMsg(m, re) {
      var e;
      if (re)
        // 加到头部
        e = $($.parseHTML(m)).prependTo(viewBinding.pageChatSeesion);else
        // 加到尾部
        e = $($.parseHTML(m)).appendTo(viewBinding.pageChatSeesion);
      return e;
    }
  }, {
    key: "isAtBottom",
    value: function isAtBottom() {
      var elementRect = viewBinding.pageChatSeesion.get(0).getBoundingClientRect();
      return elementRect.bottom <= window.innerHeight;
    }
    // 添加消息 返回消息的JQ对象
    // name: 用户id  m: 消息  t: 时间戳  re: 默认加到尾部  msgid: 消息id
  }, {
    key: "addMsg",
    value: function () {
      var _addMsg = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee11(name, m, t, re, msgid) {
        var nick, msg, temp, bn, e;
        return _regeneratorRuntime().wrap(function _callee11$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return NickCache.getNick(name);
            case 2:
              nick = _context12.sent;
              // re.data == null ? name : re.data.nick
              msg = escapeHTML(m);
              if (name === localStorage.userName) temp = "<div class=\"chat-message-right\">\n                <div class=\"message-content-with-nickname-right\">\n                <span class=\"nickname\">" + nick + "</span>\n                <div class=\"message-content mdui-card\" id=\"msgid_" + msgid + "\">\n                <span id=\"msg-content\">" + msg + "</span>\n                </div>\n                </div>\n                <img class=\"avatar\" src=\"" + User.getUserHeadUrl(name) + "\" onerror=\"this.src='res/default_head.png'\" />\n                </div>";else temp = "<div class=\"chat-message-left\">\n                <img class=\"avatar\" src=\"" + User.getUserHeadUrl(name) + "\" onerror=\"this.src='res/default_head.png'\" />\n                <div class=\"message-content-with-nickname-left\">\n                <span class=\"nickname\">" + nick + "</span>\n                <div class=\"message-content mdui-card\" id=\"msgid_" + msgid + "\">\n                <span id=\"msg-content\">" + msg + "</span>\n                </div>\n                </div>\n                </div>";
              bn = new Date(t).getMinutes();
              if (re) {
                this.addSystemMsg(temp, re);
                if (this.bbn != bn) {
                  e = this.addSystemMsg("<div class=\"mdui-center\">" + new Date().format(t == null ? Date.parse("1000-1-1 00:00:00") : t, "yyyy年MM月dd日 hh:mm:ss") + "</div>", re);
                  this.time = bn;
                }
              } else {
                if (this.bbn != bn) {
                  e = this.addSystemMsg("<div class=\"mdui-center\">" + new Date().format(t == null ? Date.parse("1000-1-1 00:00:00") : t, "yyyy年MM月dd日 hh:mm:ss") + "</div>", re);
                  this.time = bn;
                }
                this.addSystemMsg(temp, re);
              }
              this.bbn = new Date(t).getMinutes();
              return _context12.abrupt("return", e);
            case 9:
            case "end":
              return _context12.stop();
          }
        }, _callee11, this);
      }));
      function addMsg(_x12, _x13, _x14, _x15, _x16) {
        return _addMsg.apply(this, arguments);
      }
      return addMsg;
    }() // 添加消息记录  作用在 UI 和 msgList
    /* static async addMsgLocal(name, m, t, msgid) {
        this.msgList.push({
            name: name,
            msg: m,
            msgid: msgid,
        })
         this.addMsg(name, m, t)
    } */
    // 从服务器加载一些聊天记录, limit默认=13
  }, {
    key: "loadMsgs",
    value: function () {
      var _loadMsgs = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee12(limit) {
        var histroy;
        return _regeneratorRuntime().wrap(function _callee12$(_context13) {
          while (1) switch (_context13.prev = _context13.next) {
            case 0:
              _context13.next = 2;
              return this.getHistroy(this.msgList[0] == null ? null : this.msgList[0].msgid - 1, limit == null ? 13 : limit);
            case 2:
              histroy = _context13.sent;
              this.msgList = histroy;
            case 4:
            case "end":
              return _context13.stop();
          }
        }, _callee12, this);
      }));
      function loadMsgs(_x17) {
        return _loadMsgs.apply(this, arguments);
      }
      return loadMsgs;
    }()
    /* static async loadMsgsFromList(lst) {
        for (let index in lst) {
            let i = lst[index]
            await this.addMsg(i.name, i.msg, i.time)
        }
    } */
  }, {
    key: "scrollToBottom",
    value: function scrollToBottom() {
      // 吐了啊 原来这样就行了 我何必在子element去整啊
      viewBinding.chatPager.get(0).scrollBy({
        top: 1145141919810,
        behavior: 'smooth'
      });
    }
    // 从本地加载
    /*static loadMsgsFromLocal(target) {
        let data = localStorage["chat_msg_" + target]
        if (data == null || data === "[]")
            return []
         return JSON.parse(data)
    }
    // 把当前聊天记录储存到本地
    static saveToLocal() {
        localStorage["chat_msg_" + this.target] = JSON.stringify(this.msgList)
    }*/
    // 自动调整使输入框置底 CSS真tm靠不住啊
  }, {
    key: "initInputResizer",
    value: function initInputResizer() {
      var _this3 = this;
      // 实验表面移动端切出输入法时会触发1-2次resize事件
      // 可以利用这个特性来实现自动滚动文本
      var resize = function resize() {
        viewBinding.pageChatSeesion.height(window.innerHeight - viewBinding.inputToolbar.height() - $("header.mdui-appbar").height() - viewBinding.chatTab.height() - 50);
        var ledi = _this3.resizeDick - window.innerHeight;
        if (isMobile()) viewBinding.chatPager.get(0).scrollBy({
          // 5.19晚10：56分调配出来的秘方
          // < 0 为窗口变大
          // cnm的，调试十万次就你tm检测不到底是吧，就你语法天天错误是吧
          // 欺负我现在用不了电脑
          top: -ledi * (ledi < 0 && _this3.isAtBottom() ? 6 : -1),
          // (ledi < 0 ? 6 : 6),
          behavior: 'smooth'
        });
        _this3.resizeDick = window.innerHeight;
      };
      window.addEventListener("resize", resize);
      resize();
    }
    // 为消息设置长按/右键事件
  }, {
    key: "initMsgElementEvents",
    value: function initMsgElementEvents() {
      var listeners = {};
      var menu;
      var callback = function callback(e) {
        if (menu) menu.close();
        // 从 span 切到 div
        if (e.get(0).tagName.toLowerCase() != "div") e = $(e.get(0).parentNode);
        // 从 消息框 切到 更上层
        e = $(e.get(0).parentNode);
        var menuHtml = $.parseHTML("<ul class=\"mdui-menu menu-on-message\">\n            <li class=\"mdui-menu-item\">\n              <a onclick=\"copyText(`" + e.find("#msg-content").text() + "`)\" class=\"mdui-ripple\">\u590D\u5236</a>\n            </li>\n            <li class=\"mdui-menu-item\">\n              <a onclick=\"mdui.alert('\u672A\u5236\u4F5C\u529F\u80FD', '\u63D0\u793A', () => { }, { confirmText: '\u5173\u95ED' })\" class=\"mdui-ripple\">\u8F6C\u53D1</a>\n            </li>\n            </ul>");
        var $menu = $(menuHtml);
        e.before($menu);
        menu = new mdui.Menu(e.get(0), menuHtml, {
          position: "bottom",
          align: "right"
          // covered: true,
        });
        $menu.on('closed.mdui.menu', function () {
          $(menuHtml).remove();
        });
        menu.open();
      };
      viewBinding.pageChatSeesion.on('contextmenu mousedown mouseup', '.message-content', function (e) {
        var eventType = e.type;
        var self = $(e.target);

        // 根据事件类型执行不同操作
        switch (eventType) {
          case 'contextmenu':
            e.preventDefault(); // 阻止默认行为
            callback(self);
            break;
          case 'mousedown':
            listeners[self + ""] = setTimeout(function () {
              callback(self);
            }, 300); // 300颗够吗 应该够吧
            break;
          case 'mouseup':
            clearTimeout(listeners[self + ""]);
            listeners[self + ""] = null;
            break;
        }
      });
    }
  }]);
}();
_defineProperty(ChatMsgAdapter, "type", void 0);
_defineProperty(ChatMsgAdapter, "target", void 0);
// static msgList
_defineProperty(ChatMsgAdapter, "minMsgId", void 0);
_defineProperty(ChatMsgAdapter, "time", void 0);
_defineProperty(ChatMsgAdapter, "bbn", void 0);
_defineProperty(ChatMsgAdapter, "resizeDick", void 0);
var Hash = /*#__PURE__*/function () {
  function Hash() {
    _classCallCheck(this, Hash);
  }
  return _createClass(Hash, null, [{
    key: "md5",
    value: function md5(data) {
      return CryptoJS.MD5(data).toString(CryptoJS.enc.Base64);
    }
  }, {
    key: "sha256",
    value: function sha256(data) {
      return CryptoJS.SHA256(data).toString(CryptoJS.enc.Base64);
    }
  }]);
}();
var User = /*#__PURE__*/function () {
  function User() {
    _classCallCheck(this, User);
  }
  return _createClass(User, null, [{
    key: "signIn",
    value:
    // 登录账号  通过回调函数返回刷新令牌
    function signIn(name, passwd, cb) {
      client.emit("user.signIn", {
        name: name,
        passwd: Hash.sha256(passwd) + Hash.md5(passwd)
      }, function (re) {
        if (re.code !== 0) return mdui.snackbar(re.msg);
        cb(re);
      });
    }
  }, {
    key: "signUp",
    value: function signUp(name, passwd, cb) {
      client.emit("user.signUp", {
        name: name,
        passwd: Hash.sha256(passwd) + Hash.md5(passwd)
      }, function (re) {
        if (re.code !== 0) return mdui.snackbar(re.msg);
        cb(re);
      });
    }
    // 为登录对话框编写的
  }, {
    key: "signInWithDialog",
    value: function signInWithDialog(name, passwd) {
      this.signIn(name, passwd, function (re) {
        localStorage.refreshToken = re.data.refreshToken;
        localStorage.isSignIn = true;
        location.reload();
      });
    }
  }, {
    key: "setNick",
    value: function () {
      var _setNick = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee13(nick, cb) {
        return _regeneratorRuntime().wrap(function _callee13$(_context14) {
          while (1) switch (_context14.prev = _context14.next) {
            case 0:
              _context14.t0 = client;
              _context14.t1 = localStorage.userName;
              _context14.next = 4;
              return this.getAccessToken();
            case 4:
              _context14.t2 = _context14.sent;
              _context14.t3 = nick;
              _context14.t4 = {
                name: _context14.t1,
                accessToken: _context14.t2,
                nick: _context14.t3
              };
              _context14.t5 = function (re) {
                if (re.code !== 0) return mdui.snackbar(re.msg);
                if (cb) cb();
              };
              _context14.t0.emit.call(_context14.t0, "user.setNick", _context14.t4, _context14.t5);
            case 9:
            case "end":
              return _context14.stop();
          }
        }, _callee13, this);
      }));
      function setNick(_x18, _x19) {
        return _setNick.apply(this, arguments);
      }
      return setNick;
    }() // 获取头像链接
  }, {
    key: "getUserHeadUrl",
    value: function getUserHeadUrl(name) {
      return client.io.uri + "/users_head/" + name + ".png";
    }
  }, {
    key: "getAccessToken",
    value: function () {
      var _getAccessToken = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee14(er) {
        return _regeneratorRuntime().wrap(function _callee14$(_context15) {
          while (1) switch (_context15.prev = _context15.next) {
            case 0:
              if (!(this.myAccessToken == null)) {
                _context15.next = 4;
                break;
              }
              _context15.next = 3;
              return new Promise(function (res) {
                client.emit("user.getAccessToken", {
                  name: localStorage.userName,
                  refreshToken: localStorage.refreshToken
                }, function (r) {
                  if (r.data != null) res(r.data.accessToken);
                  if (er != null) er(r.msg);
                });
              });
            case 3:
              this.myAccessToken = _context15.sent;
            case 4:
              return _context15.abrupt("return", this.myAccessToken);
            case 5:
            case "end":
              return _context15.stop();
          }
        }, _callee14, this);
      }));
      function getAccessToken(_x20) {
        return _getAccessToken.apply(this, arguments);
      }
      return getAccessToken;
    }()
  }, {
    key: "uploadHeadImage",
    value: function uploadHeadImage() {
      viewBinding.uploadHeadImage.click();
    }
  }, {
    key: "uploadHeadImageCallback",
    value: function () {
      var _uploadHeadImageCallback = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee15(self) {
        var img;
        return _regeneratorRuntime().wrap(function _callee15$(_context16) {
          while (1) switch (_context16.prev = _context16.next) {
            case 0:
              img = self.files[0];
              _context16.t0 = client;
              _context16.t1 = localStorage.userName;
              _context16.next = 5;
              return User.getAccessToken();
            case 5:
              _context16.t2 = _context16.sent;
              _context16.t3 = img;
              _context16.t4 = {
                name: _context16.t1,
                accessToken: _context16.t2,
                headImage: _context16.t3
              };
              _context16.t5 = function (re) {
                return mdui.snackbar(re.msg);
              };
              _context16.t0.emit.call(_context16.t0, "user.setHeadImage", _context16.t4, _context16.t5);
            case 10:
            case "end":
              return _context16.stop();
          }
        }, _callee15);
      }));
      function uploadHeadImageCallback(_x21) {
        return _uploadHeadImageCallback.apply(this, arguments);
      }
      return uploadHeadImageCallback;
    }()
  }, {
    key: "auth",
    value: function auth() {
      client.emit("user.auth", {
        name: localStorage.userName,
        refreshToken: localStorage.refreshToken
      }, function (re) {
        if (re.code !== 0) {
          console.error(re);
          if (!re.invalid) return mdui.snackbar("验证用户失败！");
          mdui.alert("账号刷新令牌已过期, 请重新登录哦", "提示", function () {
            return User.signOutAndReload();
          }, {
            confirmText: "确定",
            closeOnConfirm: false,
            closeOnEsc: false,
            modal: true
          });
        }
      });
    }
  }, {
    key: "signOutAndReload",
    value: function signOutAndReload() {
      localStorage.refreshToken = "";
      localStorage.isSignIn = false;
      setTimeout(function () {
        return location.reload();
      }, 300);
    }
  }, {
    key: "registerCallback",
    value: function registerCallback() {
      client.on("msg.receive", /*#__PURE__*/function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee17(a) {
          var i, n;
          return _regeneratorRuntime().wrap(function _callee17$(_context18) {
            while (1) switch (_context18.prev = _context18.next) {
              case 0:
                if (!checkEmpty([a.target, a.msg, a.type])) {
                  _context18.next = 2;
                  break;
                }
                return _context18.abrupt("return");
              case 2:
                if (!(ChatMsgAdapter.target === a.target && ChatMsgAdapter.type === a.type)) {
                  _context18.next = 7;
                  break;
                }
                i = ChatMsgAdapter.isAtBottom();
                _context18.next = 6;
                return ChatMsgAdapter.addMsg(a.target, a.msg.msg, a.msg.time);
              case 6:
                if (i) ChatMsgAdapter.scrollToBottom();
              case 7:
                _context18.t0 = new 通知();
                _context18.next = 10;
                return NickCache.getNick(a.target);
              case 10:
                _context18.t1 = _context18.sent;
                _context18.t2 = "新消息 - " + _context18.t1;
                n = _context18.t0.setTitle.call(_context18.t0, _context18.t2).setMessage(a.msg.msg).setIcon(User.getUserHeadUrl(a.target)).show( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee16() {
                  return _regeneratorRuntime().wrap(function _callee16$(_context17) {
                    while (1) switch (_context17.prev = _context17.next) {
                      case 0:
                        _context17.next = 2;
                        return ChatMsgAdapter.switchTo(a.target, a.type);
                      case 2:
                        location.replace("#msgid_" + a.msg.msgid);
                        n.close();
                      case 4:
                      case "end":
                        return _context17.stop();
                    }
                  }, _callee16);
                })));
              case 13:
              case "end":
                return _context18.stop();
            }
          }, _callee17);
        }));
        return function (_x22) {
          return _ref4.apply(this, arguments);
        };
      }());
    }
  }, {
    key: "openProfileDialog",
    value: function () {
      var _openProfileDialog = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee18(name) {
        return _regeneratorRuntime().wrap(function _callee18$(_context19) {
          while (1) switch (_context19.prev = _context19.next) {
            case 0:
              viewBinding.dialogProfileHead.attr("src", User.getUserHeadUrl(name));
              _context19.t0 = viewBinding.dialogProfileNick;
              _context19.next = 4;
              return NickCache.getNick(name);
            case 4:
              _context19.t1 = _context19.sent;
              _context19.t0.text.call(_context19.t0, _context19.t1);
              new mdui.Dialog(viewBinding.dialogProfile).open();
            case 7:
            case "end":
              return _context19.stop();
          }
        }, _callee18);
      }));
      function openProfileDialog(_x23) {
        return _openProfileDialog.apply(this, arguments);
      }
      return openProfileDialog;
    }()
  }]);
}(); // 没有刷新令牌需要重新登录 或者初始化
_defineProperty(User, "myAccessToken", void 0);
if (!localStorage.refreshToken || localStorage.refreshToken === "") localStorage.isSignIn = false;
var client;
function setUpClient(server) {
  if (server && server !== "") client = new io(server, {
    auth: {
      name: localStorage.isSignIn === "false" ? null : localStorage.userName
    }
  });else client = new io({
    auth: {
      name: localStorage.isSignIn === "false" ? null : localStorage.userName
    }
  });
  client.on("connect", function () {
    User.auth();
  });
}
if (!localStorage.server || localStorage.server === "") setUpClient();else setUpClient(localStorage.server);

// 登录到账号
var dialogSignIn;
// 谨防 localStorage 字符串数据大坑
if (localStorage.isSignIn == "false") dialogSignIn = new mdui.Dialog(viewBinding.dialogSignIn.get(0), {
  modal: true,
  closeOnEsc: false,
  history: false
}).open();else {
  _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee19() {
    return _regeneratorRuntime().wrap(function _callee19$(_context20) {
      while (1) switch (_context20.prev = _context20.next) {
        case 0:
          _context20.t0 = viewBinding.userNick;
          _context20.next = 3;
          return NickCache.getNick(localStorage.userName);
        case 3:
          _context20.t1 = _context20.sent;
          return _context20.abrupt("return", _context20.t0.text.call(_context20.t0, _context20.t1));
        case 5:
        case "end":
          return _context20.stop();
      }
    }, _callee19);
  }))();
  var hello;
  var nowHour = new Date().getHours();
  if (nowHour >= 6 && nowHour <= 11) hello = "早安";else if (nowHour == 12) hello = "中午好";else if (nowHour >= 13 && nowHour <= 18) hello = "下午好";else if (nowHour >= 19 && nowHour < 22) hello = "晚上好";else hello = "晚安";
  viewBinding.helloText.text(hello);
  viewBinding.userHead.attr("src", User.getUserHeadUrl(localStorage.userName));
  ContactsList.reloadList();
  User.registerCallback();
}

// 感谢AI的力量
Stickyfill.add($("*").filter(function (a, b) {
  return $(b).css('position') === 'sticky';
}));
ChatMsgAdapter.initMsgElementEvents();
ChatMsgAdapter.initInputResizer();
function refreshAll() {
  ContactsList.reloadList();
  delete NickCache.data;
  NickCache.data = {};
}