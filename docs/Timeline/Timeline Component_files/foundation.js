/*
 * Foundation Responsive Library
 * http://foundation.zurb.com
 * Copyright 2013, ZURB
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function (e, t, n, r) { "use strict"; function i(e) { "use strict"; var t, n = this; this.trackingClick = false; this.trackingClickStart = 0; this.targetElement = null; this.touchStartX = 0; this.touchStartY = 0; this.lastTouchIdentifier = 0; this.touchBoundary = 10; this.layer = e; if (!e || !e.nodeType) { throw new TypeError("Layer must be a document node") } this.onClick = function () { return i.prototype.onClick.apply(n, arguments) }; this.onMouse = function () { return i.prototype.onMouse.apply(n, arguments) }; this.onTouchStart = function () { return i.prototype.onTouchStart.apply(n, arguments) }; this.onTouchMove = function () { return i.prototype.onTouchMove.apply(n, arguments) }; this.onTouchEnd = function () { return i.prototype.onTouchEnd.apply(n, arguments) }; this.onTouchCancel = function () { return i.prototype.onTouchCancel.apply(n, arguments) }; if (i.notNeeded(e)) { return } if (this.deviceIsAndroid) { e.addEventListener("mouseover", this.onMouse, true); e.addEventListener("mousedown", this.onMouse, true); e.addEventListener("mouseup", this.onMouse, true) } e.addEventListener("click", this.onClick, true); e.addEventListener("touchstart", this.onTouchStart, false); e.addEventListener("touchmove", this.onTouchMove, false); e.addEventListener("touchend", this.onTouchEnd, false); e.addEventListener("touchcancel", this.onTouchCancel, false); if (!Event.prototype.stopImmediatePropagation) { e.removeEventListener = function (t, n, r) { var i = Node.prototype.removeEventListener; if (t === "click") { i.call(e, t, n.hijacked || n, r) } else { i.call(e, t, n, r) } }; e.addEventListener = function (t, n, r) { var i = Node.prototype.addEventListener; if (t === "click") { i.call(e, t, n.hijacked || (n.hijacked = function (e) { if (!e.propagationStopped) { n(e) } }), r) } else { i.call(e, t, n, r) } } } if (typeof e.onclick === "function") { t = e.onclick; e.addEventListener("click", function (e) { t(e) }, false); e.onclick = null } } function o(e) { if (typeof e === "string" || e instanceof String) { e = e.replace(/^[\\/'"]+|(;\s?})+|[\\/'"]+$/g, "") } return e } if (e("head").has(".foundation-mq-small").length === 0) { e("head").append('<meta class="foundation-mq-small">') } if (e("head").has(".foundation-mq-medium").length === 0) { e("head").append('<meta class="foundation-mq-medium">') } if (e("head").has(".foundation-mq-large").length === 0) { e("head").append('<meta class="foundation-mq-large">') } if (e("head").has(".foundation-mq-xlarge").length === 0) { e("head").append('<meta class="foundation-mq-xlarge">') } if (e("head").has(".foundation-mq-xxlarge").length === 0) { e("head").append('<meta class="foundation-mq-xxlarge">') } i.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0; i.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent); i.prototype.deviceIsIOS4 = i.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent); i.prototype.deviceIsIOSWithBadTarget = i.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent); i.prototype.needsClick = function (e) { "use strict"; switch (e.nodeName.toLowerCase()) { case "button": case "select": case "textarea": if (e.disabled) { return true } break; case "input": if (this.deviceIsIOS && e.type === "file" || e.disabled) { return true } break; case "label": case "video": return true } return /\bneedsclick\b/.test(e.className) }; i.prototype.needsFocus = function (e) { "use strict"; switch (e.nodeName.toLowerCase()) { case "textarea": case "select": return true; case "input": switch (e.type) { case "button": case "checkbox": case "file": case "image": case "radio": case "submit": return false } return !e.disabled && !e.readOnly; default: return /\bneedsfocus\b/.test(e.className) } }; i.prototype.sendClick = function (e, r) { "use strict"; var i, s; if (n.activeElement && n.activeElement !== e) { n.activeElement.blur() } s = r.changedTouches[0]; i = n.createEvent("MouseEvents"); i.initMouseEvent("click", true, true, t, 1, s.screenX, s.screenY, s.clientX, s.clientY, false, false, false, false, 0, null); i.forwardedTouchEvent = true; e.dispatchEvent(i) }; i.prototype.focus = function (e) { "use strict"; var t; if (this.deviceIsIOS && e.setSelectionRange) { t = e.value.length; e.setSelectionRange(t, t) } else { e.focus() } }; i.prototype.updateScrollParent = function (e) { "use strict"; var t, n; t = e.fastClickScrollParent; if (!t || !t.contains(e)) { n = e; do { if (n.scrollHeight > n.offsetHeight) { t = n; e.fastClickScrollParent = n; break } n = n.parentElement } while (n) } if (t) { t.fastClickLastScrollTop = t.scrollTop } }; i.prototype.getTargetElementFromEventTarget = function (e) { "use strict"; if (e.nodeType === Node.TEXT_NODE) { return e.parentNode } return e }; i.prototype.onTouchStart = function (e) { "use strict"; var n, r, i; if (e.targetTouches.length > 1) { return true } n = this.getTargetElementFromEventTarget(e.target); r = e.targetTouches[0]; if (this.deviceIsIOS) { i = t.getSelection(); if (i.rangeCount && !i.isCollapsed) { return true } if (!this.deviceIsIOS4) { if (r.identifier === this.lastTouchIdentifier) { e.preventDefault(); return false } this.lastTouchIdentifier = r.identifier; this.updateScrollParent(n) } } this.trackingClick = true; this.trackingClickStart = e.timeStamp; this.targetElement = n; this.touchStartX = r.pageX; this.touchStartY = r.pageY; if (e.timeStamp - this.lastClickTime < 200) { e.preventDefault() } return true }; i.prototype.touchHasMoved = function (e) { "use strict"; var t = e.changedTouches[0], n = this.touchBoundary; if (Math.abs(t.pageX - this.touchStartX) > n || Math.abs(t.pageY - this.touchStartY) > n) { return true } return false }; i.prototype.onTouchMove = function (e) { "use strict"; if (!this.trackingClick) { return true } if (this.targetElement !== this.getTargetElementFromEventTarget(e.target) || this.touchHasMoved(e)) { this.trackingClick = false; this.targetElement = null } return true }; i.prototype.findControl = function (e) { "use strict"; if (e.control !== r) { return e.control } if (e.htmlFor) { return n.getElementById(e.htmlFor) } return e.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }; i.prototype.onTouchEnd = function (e) { "use strict"; var r, i, s, o, u, a = this.targetElement; if (!this.trackingClick) { return true } if (e.timeStamp - this.lastClickTime < 200) { this.cancelNextClick = true; return true } this.lastClickTime = e.timeStamp; i = this.trackingClickStart; this.trackingClick = false; this.trackingClickStart = 0; if (this.deviceIsIOSWithBadTarget) { u = e.changedTouches[0]; a = n.elementFromPoint(u.pageX - t.pageXOffset, u.pageY - t.pageYOffset) || a; a.fastClickScrollParent = this.targetElement.fastClickScrollParent } s = a.tagName.toLowerCase(); if (s === "label") { r = this.findControl(a); if (r) { this.focus(a); if (this.deviceIsAndroid) { return false } a = r } } else if (this.needsFocus(a)) { if (e.timeStamp - i > 100 || this.deviceIsIOS && t.top !== t && s === "input") { this.targetElement = null; return false } this.focus(a); if (!this.deviceIsIOS4 || s !== "select") { this.targetElement = null; e.preventDefault() } return false } if (this.deviceIsIOS && !this.deviceIsIOS4) { o = a.fastClickScrollParent; if (o && o.fastClickLastScrollTop !== o.scrollTop) { return true } } if (!this.needsClick(a)) { e.preventDefault(); this.sendClick(a, e) } return false }; i.prototype.onTouchCancel = function () { "use strict"; this.trackingClick = false; this.targetElement = null }; i.prototype.onMouse = function (e) { "use strict"; if (!this.targetElement) { return true } if (e.forwardedTouchEvent) { return true } if (!e.cancelable) { return true } if (!this.needsClick(this.targetElement) || this.cancelNextClick) { if (e.stopImmediatePropagation) { e.stopImmediatePropagation() } else { e.propagationStopped = true } e.stopPropagation(); e.preventDefault(); return false } return true }; i.prototype.onClick = function (e) { "use strict"; var t; if (this.trackingClick) { this.targetElement = null; this.trackingClick = false; return true } if (e.target.type === "submit" && e.detail === 0) { return true } t = this.onMouse(e); if (!t) { this.targetElement = null } return t }; i.prototype.destroy = function () { "use strict"; var e = this.layer; if (this.deviceIsAndroid) { e.removeEventListener("mouseover", this.onMouse, true); e.removeEventListener("mousedown", this.onMouse, true); e.removeEventListener("mouseup", this.onMouse, true) } e.removeEventListener("click", this.onClick, true); e.removeEventListener("touchstart", this.onTouchStart, false); e.removeEventListener("touchmove", this.onTouchMove, false); e.removeEventListener("touchend", this.onTouchEnd, false); e.removeEventListener("touchcancel", this.onTouchCancel, false) }; i.notNeeded = function (e) { "use strict"; var r; if (typeof t.ontouchstart === "undefined") { return true } if (/Chrome\/[0-9]+/.test(navigator.userAgent)) { if (i.prototype.deviceIsAndroid) { r = n.querySelector("meta[name=viewport]"); if (r && r.content.indexOf("user-scalable=no") !== -1) { return true } } else { return true } } if (e.style.msTouchAction === "none") { return true } return false }; i.attach = function (e) { "use strict"; return new i(e) }; if (typeof module !== "undefined" && module.exports) { module.exports = i.attach; module.exports.FastClick = i } else { t.FastClick = i } e(function () { if (typeof i !== "undefined") { i.attach(n.body) } }); var s = function (t, r) { if (typeof t === "string") { if (r) { return e(r.querySelectorAll(t)) } return e(n.querySelectorAll(t)) } return e(t, r) }; t.matchMedia = t.matchMedia || function (e, t) { "use strict"; var n, r = e.documentElement, i = r.firstElementChild || r.firstChild, s = e.createElement("body"), o = e.createElement("div"); o.id = "mq-test-1"; o.style.cssText = "position:absolute;top:-100em"; s.style.background = "none"; s.appendChild(o); return function (e) { o.innerHTML = '&shy;<style media="' + e + '"> #mq-test-1 { width: 42px; }</style>'; r.insertBefore(s, i); n = o.offsetWidth === 42; r.removeChild(s); return { matches: n, media: e } } }(n); (function (e) { function u() { if (n) { s(u); jQuery.fx.tick() } } var n, r = 0, i = ["webkit", "moz"], s = t.requestAnimationFrame, o = t.cancelAnimationFrame; for (; r < i.length && !s; r++) { s = t[i[r] + "RequestAnimationFrame"]; o = o || t[i[r] + "CancelAnimationFrame"] || t[i[r] + "CancelRequestAnimationFrame"] } if (s) { t.requestAnimationFrame = s; t.cancelAnimationFrame = o; jQuery.fx.timer = function (e) { if (e() && jQuery.timers.push(e) && !n) { n = true; u() } }; jQuery.fx.stop = function () { n = false } } else { t.requestAnimationFrame = function (e, n) { var i = (new Date).getTime(), s = Math.max(0, 16 - (i - r)), o = t.setTimeout(function () { e(i + s) }, s); r = i + s; return o }; t.cancelAnimationFrame = function (e) { clearTimeout(e) } } })(jQuery); t.Foundation = { name: "Foundation", version: "5.0.0", media_queries: { small: s(".foundation-mq-small").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""), medium: s(".foundation-mq-medium").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""), large: s(".foundation-mq-large").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""), xlarge: s(".foundation-mq-xlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, ""), xxlarge: s(".foundation-mq-xxlarge").css("font-family").replace(/^[\/\\'"]+|(;\s?})+|[\/\\'"]+$/g, "") }, stylesheet: e("<style></style>").appendTo("head")[0].sheet, init: function (e, t, n, r, i) { var o, u = [e, n, r, i], a = []; this.rtl = /rtl/i.test(s("html").attr("dir")); this.scope = e || this.scope; if (t && typeof t === "string" && !/reflow/i.test(t)) { if (this.libs.hasOwnProperty(t)) { a.push(this.init_lib(t, u)) } } else { for (var f in this.libs) { a.push(this.init_lib(f, t)) } } return e }, init_lib: function (e, t) { if (this.libs.hasOwnProperty(e)) { this.patch(this.libs[e]); if (t && t.hasOwnProperty(e)) { return this.libs[e].init.apply(this.libs[e], [this.scope, t[e]]) } return this.libs[e].init.apply(this.libs[e], t) } return function () { } }, patch: function (e) { e.scope = this.scope; e["data_options"] = this.lib_methods.data_options; e["bindings"] = this.lib_methods.bindings; e["S"] = s; e.rtl = this.rtl }, inherit: function (e, t) { var n = t.split(" "); for (var r = n.length - 1; r >= 0; r--) { if (this.lib_methods.hasOwnProperty(n[r])) { this.libs[e.name][n[r]] = this.lib_methods[n[r]] } } }, random_str: function (e) { var t = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""); if (!e) { e = Math.floor(Math.random() * t.length) } var n = ""; for (var r = 0; r < e; r++) { n += t[Math.floor(Math.random() * t.length)] } return n }, libs: {}, lib_methods: { throttle: function (e, t) { var n = null; return function () { var r = this, i = arguments; clearTimeout(n); n = setTimeout(function () { e.apply(r, i) }, t) } }, data_options: function (t) { function a(e) { return !isNaN(e - 0) && e !== null && e !== "" && e !== false && e !== true } function f(t) { if (typeof t === "string") return e.trim(t); return t } var n = {}, r, i, s, o, u = t.data("options"); if (typeof u === "object") { return u } s = (u || ":").split(";"), o = s.length; for (r = o - 1; r >= 0; r--) { i = s[r].split(":"); if (/true/i.test(i[1])) i[1] = true; if (/false/i.test(i[1])) i[1] = false; if (a(i[1])) i[1] = parseInt(i[1], 10); if (i.length === 2 && i[0].length > 0) { n[f(i[0])] = f(i[1]) } } return n }, delay: function (e, t) { return setTimeout(e, t) }, empty: function (e) { if (e.length && e.length > 0) return false; if (e.length && e.length === 0) return true; for (var t in e) { if (hasOwnProperty.call(e, t)) return false } return true }, register_media: function (t, n) { if (Foundation.media_queries[t] === r) { e("head").append('<meta class="' + n + '">'); Foundation.media_queries[t] = o(e("." + n).css("font-family")) } }, addCustomRule: function (e, t) { if (t === r) { Foundation.stylesheet.insertRule(e, Foundation.stylesheet.cssRules.length) } else { var n = Foundation.media_queries[t]; if (n !== r) { Foundation.stylesheet.insertRule("@media " + Foundation.media_queries[t] + "{ " + e + " }") } } }, loaded: function (e, t) { function n() { t(e[0]) } function r() { this.one("load", n); if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) { var e = this.attr("src"), t = e.match(/\?/) ? "&" : "?"; t += "random=" + (new Date).getTime(); this.attr("src", e + t) } } if (!e.attr("src")) { n(); return } if (e[0].complete || e[0].readyState === 4) { n() } else { r.call(e) } }, bindings: function (t, n) { var r = this, i = !s(this).data(this.name + "-init"); if (typeof t === "string") { return this[t].call(this) } if (s(this.scope).is("[data-" + this.name + "]")) { s(this.scope).data(this.name + "-init", e.extend({}, this.settings, n || t, this.data_options(s(this.scope)))); if (i) { this.events(this.scope) } } else { s("[data-" + this.name + "]", this.scope).each(function () { var i = !s(this).data(r.name + "-init"); s(this).data(r.name + "-init", e.extend({}, r.settings, n || t, r.data_options(s(this)))); if (i) { r.events(this) } }) } } } }; e.fn.foundation = function () { var e = Array.prototype.slice.call(arguments, 0); return this.each(function () { Foundation.init.apply(Foundation, [this].concat(e)); return this }) } })(jQuery, this, this.document)