var wubi86 = [],
  wubi861 = [],
  pinyin = [],
  dazi_pk = []; 

(function() {
  function ia(a) {
    return ! 1
  }
  function ja() {
    return ! 0
  }
  function v(a, b) {
    var e = b ? b: 0;
    if (a >= m.length) Y();
    else {
      for (var c = 0; c < m.length; c += 2) {
        var d = m.item(c).getElementsByTagName("input").item(1);
        a == c && "stop" != e ? (d.readOnly = !1, d.onfocus = "", Z(d), d.onkeydown = S, d.onkeyup = S, d.oninput = S, d.onclick = "") : "stop" != e ? d.onfocus = function() {
          var b = m.item(a).getElementsByTagName("input").item(1);
          Z(b)
        }: (d.readOnly = !0, a == c && (d.onclick = function() {
          confirm("\u6b63\u5904\u4e8e\u6682\u505c\u72b6\u6001\uff0c\u6062\u590d\u6253\u5b57\uff1f") && dazi_pause(G("pause_a"))
        }))
      }
      r = 0
    }
  }
  function S(a) {
    var b = a || window.event;
    if (0 < w) return ! 1;
    var e = this.parentNode.getElementsByTagName("div").item(0).getElementsByTagName("span").item(0),
      c = this.parentNode.getElementsByTagName("input").item(0);
    a = this.value.length;
    var d = c.value.length,
      g = M[f],
      la = ka(c.value, this.value),
      b = b.which ? b.which: b.keyCode;
    e.innerHTML = la;
    65 <= b && 90 >= b && 0 == q && T();
    if (0 == aa) 8 == b && 2 <= f && ba != f - 2 && 1 != r && 0 == a && (r = 1, f -= 2, v(f), this.oninput = this.onkeyup = this.onkeydown = "", 150 > p(this) - A() && (u = p(this) - 150, window.scroll(0, u)));
    else {
      0 < a && 0 == q && T();
      if (1 != r && f < m.length) {
        1 == B[f] - a && 0 == M[f] && 0 == g && U++;
        if (a < d || " " != c.value.substring(d - 1, d)) B[f] = 0 < a ? a > d ? d: a: 0;
        e = V(B) - V(M);
        e - k > W && (W = e - k);
        k = e;
        C = V(ca)
      }
      d == a && c.value.substring(d - 1, d) == this.value.substring(a - 1, a) && B.length != f / 2 && 1 != r ? (r = 1, ba = f, f += 2, setTimeout(function() {
        f < m.length && (m.item(f).getElementsByTagName("input").item(1).value = "");
        v(f)
      },
        10), this.oninput = this.onkeyup = this.onkeydown = "", 300 < p(this) - A() && (u = p(this) - 300, window.scroll(0, u))) : d < a && c.value.substring(d - 1, d) == this.value.substring(d - 1, d) && B.length != f / 2 && 1 != r ? (r = 1, c = this.value, m.item(f).getElementsByTagName("input").item(1).value = c.substr(0, d), f += 2, m.item(f).getElementsByTagName("input").item(1).value = c.substr(d, a - d), v(f), this.oninput = this.onkeyup = this.onkeydown = "", 300 < p(this) - A() && (u = p(this) - 300, window.scroll(0, u))) : d <= a && 13 == b && 1 != r && (r = 1, f += 2, v(f), this.oninput = this.onkeyup = this.onkeydown = "", 300 < p(this) - A() && (u = p(this) - 300, window.scroll(0, u)))
    }
    aa = a
  }
  function T() {
    0 == D && (D = x());
    clearTimeout(X);
    X = setTimeout(T, 100);
    var a = G("typing_info_li"),
      b = G("name"),
      e = G("time"),
      c = 0 < w ? x() - w: 0;
    q = x() - D - c - da;
    N = 0 < q ? E((k - C) / q * 6E4, 0) : 0;
    O = 0 < k ? E((k - C) / k * 100, 0) : 0;
    q > 5E3 * t.length && (1 <= t.length ? t[t.length] = k - ea: t[0] = k, ea = k);
    if ("undefined" != typeof dazi_pk[0]) {
      for (var c = .001 * q / 5,
        d = 0,
        g = 0; g < c + 1; g++)"undefined" != typeof dazi_pk[g] && (d = g == parseInt(c + 1) ? d + dazi_pk[g] * (c - parseInt(c)) : d + parseInt(dazi_pk[g]));
      F = d.toFixed(2);
      if (0 < F) for (var f = g = 0; f < m.length; f += 2) {
        var h = m.item(f).getElementsByTagName("input").item(0),
          c = m.item(f).getElementsByTagName("span").item(0),
          d = m.item(f).getElementsByTagName("span").item(1),
          h = h.value.length;
        if (g + h > F) {
          g = F - g;
          g = g.toFixed(2);
          d = d.offsetWidth;
          c.style.display = "block";
          c.style.left = parseInt(g / h * d) + "px";
          c.className = F > k ? "dazi_pk": "dazi_pk2";
          break
        } else g += parseInt(h),
          c.style.display = "none"
      }
    }
    b = '\x3cul\x3e\x3cli class\x3d"name"\x3e' + b.value + "\x3c/li\x3e\x3cli\x3e\u8bbe\u5b9a\uff1a" + e.value + ' \u5206\u949f\x3c/li\x3e\x3cli\x3e\x3cdiv id\x3d"time_table"\x3e';
    c = new Date(q);
    c = c.getMinutes() + "\u5206 " + c.getSeconds() + "\u79d2";
    a.innerHTML = b + c + "\x3c/div\x3e\x3c/li\x3e\x3cli\x3e\u901f\u5ea6\uff1a" + N + " " + ("cn" == G("type").value ? "WPM": "KPM") + "\x3c/li\x3e\x3cli\x3e\u6b63\u786e\u7387\uff1a" + O + " %\x3c/li\x3e\x3c/ul\x3e\x3cli\x3e\u9519\u8bef\uff1a" + C + "\x3c/li\x3e\x3cli\x3e\u603b\u5b57\u6570\uff1a" + k + "\x3c/li\x3e\x3cli\x3e\u9000\u683c\uff1a" + U + '\x3c/li\x3e\x3cli class\x3d"pinyin"\x3e\u62fc\u97f3\uff1a' + H + ("" != y ? "(" + y + ")": "") + '\x3c/li\x3e\x3cli class\x3d"wubi86"\x3e\u4e94\u7b14\uff1a' + I + ("" != z ? "(" + z + ")": "") + '\x3c/li\x3e\x3cli class\x3d"wubi86"\x3e\u8bcd\u7ec4\uff1a' + P + ("" != J ? "(" + J + ")": "") + '\x3c/li\x3e\x3c/ul\x3e\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e';
    b = q;
    a = G("time_table");
    c = G("time");
    b = E(b / (6E4 * parseInt(c.value)) * 100, 0) - 100;
    a.style.backgroundPosition = b + "px 0px";
    if (a = G("typing_info")) b = p(a) - A() - 100,
      c = window.innerHeight && window.scrollMaxY ? document.body.scrollWidth: document.body.scrollHeight > document.body.offsetHeight ? document.body.scrollWidth: document.body.offsetWidth,
      d = m.item(0).offsetWidth,
      a.style.marginRight = "0px",
      a.style.right = 124 < (c - d) / 2 ? Math.round((c - d) / 2 - 124) + "px": "10px",
      20 < b && (a.style.top = p(a) - E(.1 * Math.abs(b), 0) + "px"),
      0 > b && (a.style.top = p(a) + E(.1 * Math.abs(b), 0) + "px");
    q >= 6E4 * e.value && (clearTimeout(X), Y())
  }
  function Y() {
    for (var a = qx1,
      b = 0,
      e = 0; e < t.length; e++) b += t[e];
    0 != k - b && (t[t.length] = k - b);
    document.getElementById(a).value = t.join(",");
    var c = tp1.split(",");
    if (7 == c.length) {
      var a = c[0],
        b = c[1],
        e = c[2],
        d = c[3],
        g = c[4],
        f = c[5],
        c = c[6];
      if (0 == fa) {
        fa = 1;
        var h = G("info_form");
        h.action += "?" + a + "\x3d" + W + "\x26" + b + "\x3d" + q + "\x26" + e + "\x3d" + N + "\x26" + d + "\x3d" + O + "\x26" + g + "\x3d" + U + "\x26" + f + "\x3d" + k + "\x26" + c + "\x3d" + C;
        alert("\x3d\x3d\x3d\x3d\x3d\x3d\x3d\u6d4b\u8bd5\u7ed3\u679c\uff08" + ("cn" == G("type").value ? "\u4e2d\u6587": "\u82f1\u6587") + "\u6253\u5b57\uff09\x3d\x3d\x3d\x3d\x3d\x3d\x3d\n\u65f6\u95f4\uff1a" + G("time").value + "\u5206\u949f\uff0c\u901f\u5ea6\uff1a" + N + ("cn" == G("type").value ? "WPM": "KPM") + "\uff0c\u6b63\u786e\u7387\uff1a" + O + "%");
        h.submit()
      }
    }
  }
  function Z(a) {
    if ("undefined" != typeof a.createTextRange) {
      var b = a.createTextRange();
      b.moveStart("character", a.value.length);
      b.collapse(!0);
      b.select()
    } else a.setSelectionRange(a.value.length, a.value.length),
      a.focus()
  }
  function ka(a, b) {
    str1 = ga(a);
    str2 = ga(b);
    var e = "",
      c = 0,
      d = null,
      g = 0,
      k = G("type").value,
      l = str1.length,
      n = str2.length;
    for (h = 0; h < (l > n ? l: n); h++) if (h < l) {
      var q = h < n ? b.substr(h) : null,
        p = /^[a-z\' ]{1,20}$/;
      str1[h] == str2[h] ? e += '\x3cspan class\x3d"green"\x3e' + str1[h] + "\x3c/span\x3e": null == str2[h] ? (e += str1[h], 0 == g && 0 < n && (g = h)) : "cn" == k && p.test(q) ? (e += '\x3cspan class\x3d"yellow"\x3e' + str1[h] + "\x3c/span\x3e", 0 == g && 0 < n && (g = h), null == d && (d = n < l ? n - h: l - h)) : (c++, e += '\x3cspan class\x3d"red"\x3e' + str1[h] + "\x3c/span\x3e")
    }
    if (0 == n || 0 != g) {
      k = m.item(f).id;
      k = k.substr(2);
      if ("array" == typeof wubi86[k] || "object" == typeof wubi86[k]) {
        if (n = wubi86[k], "array" == typeof n[g] || "object" == typeof n[g]) {
          q = "";
          for (p = g; p < g + n[g][0] && p < l; p++) q += str1[p];
          J = q;
          P = n[g][1]
        }
      } else J = "",
        P = "-";
      "array" == typeof wubi861[k] || "object" == typeof wubi861[k] ? (n = wubi861[k], "undefined" != typeof n[g] ? (z = str1[g], I = n[g]) : (z = "", I = "-")) : (z = "", I = "-");
      "array" == typeof pinyin[k] || "object" == typeof pinyin[k] ? (n = pinyin[k], "undefined" != typeof n[g] ? (y = str1[g], H = n[g]) : (y = "", H = "-")) : (y = "", H = "-")
    } else J = "",
      P = "-",
      y = "",
      H = "-",
      z = "",
      I = "-";
    ca[f] = c;
    M[f] = null == d ? 0 : d;
    return e
  }
  function V(a) {
    for (var b = 0,
      e = 0; e < 2 * a.length && e <= f; e += 2) 0 < a[e] && (b += a[e]);
    return b
  }
  function ga(a) {
    for (var b = [], e = 0; e < a.length; e++) b[e] = a.substr(e, 1);
    return b
  }
  function x() {
    return (new Date).getTime()
  }
  function E(a, b) {
    return Math.round(a * Math.pow(10, b)) / Math.pow(10, b)
  }
  function A() {
    var a = 0;
    "undefined" != typeof window.pageYOffset ? a = window.pageYOffset: "undefined" != typeof window.document.compatMode && "BackCompat" != window.document.compatMode ? a = window.document.documentElement.scrollTop: "undefined" != typeof window.document.body && (a = window.document.body.scrollTop);
    return a
  }
  function p(a) {
    var b = a.offsetTop;
    for (a = a.offsetParent; null !== a;) b += a.offsetTop,
      a = a.offsetParent;
    return b
  }
  function ma() {
    for (var a = 0,
      b = 0,
      e = 1; e < m.length; e += 2) {
      var c = m.item(e).getElementsByTagName("span");
      1 == c.length && (c = c.item(0).offsetWidth, c > a && (a = c, b = e))
    }
    return [b, a]
  }
  function ha(a) {
    a = a || window.event;
    var b = a.target || a.srcElement,
      e = b.type || b.getAttribute("type"),
      c = b.getAttribute("readonly"),
      b = b.getAttribute("enabled");
    if (8 == a.keyCode && "password" != e && "text" != e && "textarea" != e || !(8 != a.keyCode || "password" != e && "text" != e && "textarea" != e || 1 != (null == c ? !1 : c) && 1 == (null == b ? !0 : b))) return ! 1
  }
  var m = G("content").getElementsByTagName("div"),
    f = 0,
    D = 0,
    w = 0,
    da = 0,
    B = [],
    ca = [],
    M = [],
    u = 0,
    ba = -1,
    r = 0,
    t = [],
    ea = 0,
    P = "",
    J = "",
    I = "",
    z = "",
    H = "",
    y = "",
    F = 0,
    aa = 0,
    N = 0,
    O = 0,
    q = 0,
    U = 0,
    W = 0,
    k = 0,
    C = 0,
    K = null,
    fa = 0;
  window.onscroll = function() {
    window.scroll(0, u)
  };
  document.body.onpaste = function() {
    return ! 1
  };
  document.body.oncopy = function() {
    return ! 1
  };
  document.body.oncut = function() {
    return ! 1
  };
  document.onselectstart = new Function("return false");
  window.sidebar && (document.onmousedown = ia, document.onclick = ja);
  var X = null;
  dazi_pause = function(a) {
    "pause" == a.className ? (a.innerHTML = "\u7ee7\u7eed", a.className = "pause2", 0 < D && (w = x()), v(f, "stop")) : (a.innerHTML = "\u6682\u505c", a.className = "pause", 0 < D && (da += x() - w, w = 0), v(f))
  };
  close_light = function(a) {
    "light" == a.className ? (a.innerHTML = "\u5f00\u706f", a.className = "light2", document.body.className = "dazi_style_black") : (a.innerHTML = "\u5173\u706f", a.className = "light", document.body.className = "")
  };
  var l = {
    o: null,
    init: function(a) {
      a.onmousedown = this.start
    },
    start: function(a) {
      a = l.fixEvent(a);
      a.preventDefault && a.preventDefault();
      l.o = this;
      this.x = a.clientX - l.o.offsetLeft;
      this.y = a.clientY - l.o.offsetTop;
      document.onmousemove = l.move;
      document.onmouseup = l.end
    },
    move: function(a) {
      a = l.fixEvent(a);
      var b;
      b = a.clientX - l.o.x;
      a = a.clientY - l.o.y;
      l.o.style.left = b + "px";
      l.o.style.top = a + "px"
    },
    end: function(a) {
      l.fixEvent(a);
      l.o = document.onmousemove = document.onmouseup = null
    },
    fixEvent: function(a) {
      a || (a = window.event, a.target = a.srcElement, a.layerX = a.offsetX, a.layerY = a.offsetY);
      return a
    }
  };
  typing_continue = function() {
    clearTimeout(K);
    K = setTimeout("typing_continue()", 31E5);
    var a = x(),
      b = new AjaxClass;
    b.Method = "GET";
    b.Url = "jingsai_do.php?do\x3dtyping_continue\x26start_page\x3d" + G("start_page").value + "\x26ssid\x3d" + G("ssid").value + "\x26t\x3d" + a;
    b.Async = !0;
    b.Loading = function() {};
    b.CallBack = function(a) {
      clearTimeout(K);
      K = setTimeout("typing_continue()", 3E6)
    };
    b.Send()
  };
  K = setTimeout("typing_continue()", 3E6);
  if (1 < m.length) {
    var Q = document.documentElement.clientWidth,
      R = G("group_typing_info").offsetWidth;
    Q > R && (Q -= (Q - R) / 2);
    for (var L = ma(), h = 1; 10 >= h; h++) {
      var na = m.item(L[0]).getElementsByTagName("span").item(0);
      L[1] = na.offsetWidth;
      if (0 < R && 0 < L[1] && (L[1] > R - 20 || L[1] > Q - 130)) G("content").className = "font" + h;
      else break
    }
  }
  v(f);
  G("loading").style.display = "none";
  G("typing_info").style.display = "block";
  l.init(document.getElementById("typing_info"));
  document.onkeypress = ha;
  document.onkeydown = ha
})();
