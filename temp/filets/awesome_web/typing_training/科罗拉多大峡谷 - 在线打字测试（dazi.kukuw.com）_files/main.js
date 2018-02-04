function F(c) {
  return document.getElementById(c).value
}

function G(c) {
  return document.getElementById(c)
}

var art_sys = [],
  art_my = [],
  art_tag = []; 

(function() {
  function c() {
    return G("radio_en").checked ? "en": G("radio_cn").checked ? "cn": G("radio_group") ? G("radio_group").checked ? "group": "group2": ""
  }
  function b(a, p) {
    var b = c();
    if ("en" == b || "cn" == b) {
      var b = document.getElementById("art_tag_" + b).getElementsByTagName("a"),
      e = b[0].offsetLeft,
      f = b[0].offsetTop; (new Date).getTime();
      for (var d = 1; d < b.length; d++) {
        var g = b[d].className,
        g = g.replace(/\sstag/i, "");
        b[d].className = a > e - 140 && p > f + 35 * d - 17 && a < e + 140 && p < f + 35 * d + 17 ? g + " stag": g
      }
    }
  }
  function h(a) {
    var b = c();
    if ("en" == b || "cn" == b) {
      for (var m = document.getElementById("art_tag_" + b).getElementsByTagName("a"), e = 0, f = 0, d = 1; d < m.length; d++) {
        var g = m[d].className;
        g.match(/\sstag/i) && (e = m[d].id);
        g.match(/^on/i) && (f = m[d].id)
      }
      if (e) if (e.match(/new/i)) show_tag(b, "n", a);
      else if (0 != e && 0 != f && e != f) {
        var m = new Date,
        h = parseInt(a.substr(4, a.length)),
        l = e.substr(4, 2),
        k = parseInt(e.substr(7, e.length)),
        n = parseInt(f.substr(7, f.length));
        G("tag_" + b + "_" + k).className = "loading";
        a = new AjaxClass;
        a.Method = "GET";
        a.Url = "jingsai_do.php?do\x3dart_to_tag\x26art\x3d" + h + "\x26tag\x3d" + k + "\x26tag2\x3d" + n + "\x26t\x3d" + m.getTime();
        a.Async = !0;
        a.Loading = function() {};
        a.CallBack = function(a) {
          if (a) if ("ok" == a) {
            for (var b in art_my[l]) for (a = 0; a < art_my[l][b].length; a++) art_my[l][b][a][0] == h && (art_my[l][k].push([art_my[l][b][a][0], art_my[l][b][a][1], art_my[l][b][a][2], art_my[l][b][a][3]]), art_my[l][b].splice(a, 1));
            show_tag(l, n)
          } else alert(a)
        };
        a.Send()
      }
    }
  }
  var l = [],
  k = [],
  n = [];
  l.en = "s";
  l.cn = "s";
  k.en = "21";
  k.cn = "1";
  loading_select_text = function(a, b) {
    if ("en" == a || "cn" == a) {
      var c = 0;
      "" == b && (b = k[a]);
      if (40 >= b) for (var e = 0; e < art_sys[a].length; e++) {
        if (art_sys[a][e][0] == b) {
          l[a] = "s";
          k[a] = b;
          select_text(G("radio_" + a), b, art_sys[a][e][1]);
          c = 1;
          break
        }
      } else for (var p in art_my[a]) for (e = 0; e < art_my[a][p].length; e++) if (art_my[a][p][e][0] == b) {
        l[a] = p;
        k[a] = b;
        select_text(G("radio_" + a), b, art_my[a][p][e][1]);
        c = 1;
        break
      }
      0 == c && select_text(G("radio_" + a), art_sys[a][0][0], art_sys[a][0][1])
    } else "group" == a ? G("jingsai_a_" + b) ? (select_art_show(), G("jingsai_a_" + b).click()) : (c = document.getElementById("select_v_group").getElementsByTagName("a"), 0 < c.length && (select_art_show(), c.item(0).click())) : "group2" != a && select_text(G("radio_en"), 21, "a girl selling matches")
  };
  select_suiji = function() {
    var a = c(),
    b = [],
    m = 0;
    if ("en" == a || "cn" == a) {
      for (var e = 0; e < art_sys[a].length; e++) b[m] = [art_sys[a][e][0], art_sys[a][e][1]],
      m++;
      for (var f in art_my[a]) for (e = 0; e < art_my[a][f].length; e++) b[m] = [art_my[a][f][e][0], art_my[a][f][e][1]],
      m++;
      m = Math.ceil(Math.random() * b.length) - 1;
      select_text(G("radio_" + a), b[m][0], b[m][1])
    } else "group" == a && (a = document.getElementById("select_v_group").getElementsByTagName("a"), m = Math.ceil(Math.random() * (a.length - 1)) - 1, select_art_show(), a.item(m).click())
  };
  select_text = function(a, b, c, e) {
    a = a.value;
    G("select_i").innerHTML = "";
    G("select_art_v").value = "";
    b = b ? b: 0;
    c = c ? c: "";
    e = e ? e: "";
    0 < b && "" != c && (G("select_i").innerHTML = c, G("select_art_v").value = b, "" != e ? (G("time").value = e, G("time").disabled = "disabled", G("dazi_continue").disabled = "disabled", G("dazi_pk_my").disabled = "disabled") : G("time") && (G("time").disabled = "", G("dazi_continue").disabled = "", G("dazi_pk_my").disabled = ""));
    "group2" == a ? (G("select_title").innerHTML = "\u9080\u8bf7\u7801\uff1a", G("group_num").style.display = "inline-block", G("group_num_ts").style.display = "inline-block", G("select_i").style.display = "none", G("select_b").style.display = "none", G("time").disabled = "disabled", G("dazi_continue").disabled = "disabled", G("dazi_pk_my").disabled = "disabled", G("suiji_a").style.display = "none") : (G("select_title") && (G("select_title").innerHTML = "\u9009\u62e9\u6587\u7ae0\uff1a"), G("select_i").style.display = "block", G("select_b").style.display = "block", G("group_num") && (G("group_num").style.display = "none", G("group_num_ts").style.display = "none"), G("suiji_a").style.display = "");
    a = G("select_b");
    "select_b" != a.className && select_art_show()
  };
  select_art_show = function() {
    var a = G("select_b"),
    b = a.className,
    m = c();
    G("select_v_en").style.display = "none";
    G("select_v_cn").style.display = "none";
    G("select_v_group") && (G("select_v_group").style.display = "none");
    var e = G("select_v_" + m);
    "select_b" == b ? (e.style.display = "block", a.className = "select_b_on") : (e.style.display = "none", a.className = "select_b");
    "en" != m && "cn" != m || show_tag(m, l[m])
  };
  show_tag = function(a, b, c) {
    var e = 1,
    f = '\x3ca href\x3d"javascript:;" onclick\x3d"show_tag(\'' + a + "','s')\" " + ("s" == b ? ' class\x3d"on"': "") + ' id\x3d"tag_' + a + '_s"\x3e\u7cfb\u7edf\u6587\u7ae0\x3c/a\x3e';
    if (art_my.hasOwnProperty(a)) {
      var d = art_my[a].hasOwnProperty(0) ? art_my[a][0].length: 0,
      f = f + ('\x3ca href\x3d"javascript:;" onclick\x3d"show_tag(\'' + a + "',0)\" " + (0 == b ? ' class\x3d"on"': "") + ' id\x3d"tag_' + a + '_0"\x3e\u6211\u7684\u6587\u7ae0\x3cspan\x3e(' + d + ")\x3c/span\x3e\x3c/a\x3e");
      e++
    }
    for (d = 0; d < art_tag.length; d++) if ("array" == typeof art_my[a][art_tag[d][0]] || "object" == typeof art_my[a][art_tag[d][0]]) f += '\x3ca href\x3d"javascript:;" onclick\x3d"show_tag(\'' + a + "'," + art_tag[d][0] + ')" ' + (b == art_tag[d][0] ? ' class\x3d"on"': "") + ' id\x3d"tag_' + a + "_" + art_tag[d][0] + '"\x3e' + art_tag[d][1] + "\x3cspan\x3e(" + art_my[a][art_tag[d][0]].length + ")\x3c/span\x3e\x3c/a\x3e",
    e++;
    art_my.hasOwnProperty(a) && (f += '\x3ca id\x3d"tag_' + a + '_new" href\x3d"javascript:;" onclick\x3d"show_tag(\'' + a + "','n')\" " + ("n" == b ? ' class\x3d"on"': "") + ' class\x3d"new"\x3e\u65b0\u5206\u7c7b\x3c/a\x3e', e++);
    G("art_tag_" + a).innerHTML = f;
    9 < e && (f = 420 < 35 * e ? 420 : 35 * e, G("select_v_" + a).style.height = f + "px");
    n = [];
    f = '\x3cdiv class\x3d"ul"\x3e';
    if ("s" == b) {
      if ("array" == typeof art_sys[a] || "object" == typeof art_sys[a]) for (d = 0; d < art_sys[a].length; d++) f += '\x3ca class\x3d"sys' + (art_sys[a][d][0] == k[a] ? " on": "") + '" href\x3d"javascript:;" onclick\x3d"select_art(this,' + art_sys[a][d][0] + ')"\x3e' + art_sys[a][d][1] + "\x3c/a\x3e"
    } else if ("n" == b) if (c = c ? c: "", "" == c) {
      f += '\x3cdiv class\x3d"tpis"\x3e\x3cspan\x3e\u6b65\u9aa4(1/2)\uff1a\u76f4\u63a5\u9009\u62e9\u5e38\u7528\u5206\u7c7b\uff0c\u4e5f\u53ef\u4ee5\u81ea\u5b9a\u4e49\u5206\u7c7b\u540d\u79f0\uff01\x3c/span\x3e\x3c/div\x3e';
      if ("array" == typeof tag_all[a] || "object" == typeof tag_all[a]) for (d = 0; d < tag_all[a].length; d++) f += '\x3ca class\x3d"tag" href\x3d"javascript:;" onclick\x3d"new_tag(\'' + a + "','" + tag_all[a][d][1] + "'," + tag_all[a][d][0] + ')"\x3e' + tag_all[a][d][1] + "\x3c/a\x3e";
      f += '\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e\x3cdiv class\x3d"tag_form"\x3e\u81ea\u5b9a\u4e49\u5206\u7c7b\uff1a\x3cinput type\x3d"text" id\x3d"tag_form_text_' + a + '"\x3e\x3c/input\x3e\x3cinput onclick\x3d"new_tag(\'' + a + "',G('tag_form_text_" + a + '\').value,0)" type\x3d"button" value\x3d" \u4e0b\u4e00\u6b65 "\x3e\x3c/input\x3e\x3c/div\x3e'
    } else {
      f += '\x3cdiv class\x3d"tpis"\x3e\x3cspan\x3e\u6587\u7ae0\u5c06\u79fb\u52a8\u5230\u65b0\u5206\u7c7b\uff1a\u76f4\u63a5\u9009\u62e9\u5e38\u7528\u5206\u7c7b\uff0c\u4e5f\u53ef\u4ee5\u81ea\u5b9a\u4e49\u5206\u7c7b\u540d\u79f0\uff01\x3c/span\x3e\x3c/div\x3e';
      if ("array" == typeof tag_all[a] || "object" == typeof tag_all[a]) for (d = 0; d < tag_all[a].length; d++) f += '\x3ca class\x3d"tag" href\x3d"javascript:;" onclick\x3d"new_tag_art(\'' + a + "','" + tag_all[a][d][1] + "'," + tag_all[a][d][0] + "," + c.substr(4) + ')"\x3e' + tag_all[a][d][1] + "\x3c/a\x3e";
      f += '\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e\x3cdiv class\x3d"tag_form"\x3e\u81ea\u5b9a\u4e49\u5206\u7c7b\uff1a\x3cinput type\x3d"text" id\x3d"tag_form_text" value\x3d""\x3e\x3c/input\x3e\x3cinput onclick\x3d"new_tag_art(\'' + a + "',G('tag_form_text').value,0," + c.substr(4) + ')" type\x3d"button" value\x3d" \u786e\u5b9a\u6dfb\u52a0 "\x3e\x3c/input\x3e\x3c/div\x3e'
    } else if ("array" == typeof art_my[a][b] || "object" == typeof art_my[a][b]) for (f = 0 == art_my[a][b].length ? f + '\x3cdiv class\x3d"tpis"\x3e\x3cspan\x3e\u63d0\u793a\uff1a\u8d76\u5feb\u70b9\u51fb\u4e0b\u9762\u7684\u94fe\u63a5\u53bb\u6dfb\u52a0\u6216\u6536\u85cf\u66f4\u591a\u6587\u7ae0\u5427\uff01\x3c/span\x3e\x3c/div\x3e': f + '\x3cdiv class\x3d"tpis"\x3e\x3cspan\x3e\u63d0\u793a\uff1a\u53ef\u62d6\u62fd\u6587\u7ae0\u81f3\u5de6\u4fa7\u5206\u7c7b\uff01\x3c/span\x3e\x3c/div\x3e', d = 0; d < art_my[a][b].length; d++) f += '\x3ca id\x3d"art_' + art_my[a][b][d][0] + '" class\x3d"' + (1 == art_my[a][b][d][2] ? "ren": "") + (art_my[a][b][d][0] == k[a] ? " on": "") + '" href\x3d"javascript:;" onclick\x3d"select_art(this,' + art_my[a][b][d][0] + ')"\x3e' + art_my[a][b][d][1] + "\x3c/a\x3e",
    n[n.length] = art_my[a][b][d][0];
    f += '\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e\x3c/div\x3e';
    "n" != b && art_my.hasOwnProperty(a) && (f += '\x3cdiv class\x3d"fabu"\x3e\x3ca href\x3d"my_typing.php?do\x3dartnew" class\x3d"add"\x3e\u6dfb\u52a0\u81ea\u5b9a\u4e49\u6587\u7ae0\x3c/a\x3e\x3ca href\x3d"art_0_0_' + ("en" == a ? "1": "2") + '.html" class\x3d"fav"\x3e\u66f4\u591a' + ("en" == a ? "\u82f1\u6587": "\u4e2d\u6587") + '\u6587\u7ae0\x3c/a\x3e\x3ca href\x3d"my_typing.php?do\x3dart" class\x3d"edit"\x3e\u4fee\u6539/\u5220\u9664\u6587\u7ae0\x3c/a\x3e\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e\x3c/div\x3e');
    G("art_ul_" + a).innerHTML = f;
    l[a] = b;
    for (a = 0; a < n.length; a++) b = document.getElementById("art_" + n[a]),
    g.init(b)
  };
  select_art = function(a, b, c) {
    c = c ? c: "";
    G("select_i").innerHTML = a.innerHTML;
    G("select_art_v").value = b;
    "" != c && (G("time").value = c);
    select_art_show()
  };
  var g = {
    o: null,
    init: function(a) {
      a.onmousedown = this.start
    },
    start: function(a) {
      a = g.fixEvent(a);
      a.preventDefault && a.preventDefault();
      g.o = this;
      this.x = a.clientX - g.o.offsetLeft;
      this.y = a.clientY - g.o.offsetTop;
      document.onmousemove = g.move;
      document.onmouseup = g.end
    },
    move: function(a) {
      a = g.fixEvent(a);
      var c;
      c = a.clientX - g.o.x;
      a = a.clientY - g.o.y;
      g.o.style.position = "absolute";
      g.o.style.left = c + "px";
      g.o.style.top = a + "px";
      g.o.onclick = function() {};
      b(c, a)
    },
    end: function(a) {
      a = g.fixEvent(a);
      g.o.style.position = "";
      setTimeout(function() {
        g.o.onclick = function() {
          select_art(this, this.id.substr(4, this.length))
        }
      },
      100);
      h(g.o.id);
      document.onmousemove = document.onmouseup = null
    },
    fixEvent: function(a) {
      a || (a = window.event, a.target = a.srcElement, a.layerX = a.offsetX, a.layerY = a.offsetY);
      return a
    }
  };
  new_tag = function(a, b, c) {
    if ("" == b) alert("\u5206\u7c7b\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a\uff01");
    else if (2 > b.length || 6 < b.length) alert("\u5206\u7c7b\u540d\u79f0\u957f\u5ea6\u5e94\u4e3a2-6\u4e2a\u5b57\u7b26\uff01");
    else if ("array" == typeof art_my[a][0] || "object" == typeof art_my[a][0]) {
      var e;
      e = '\x3cdiv class\x3d"ul"\x3e' + ('\x3cdiv class\x3d"tpis"\x3e\u6b65\u9aa4(2/2)\uff1a\u8bf7\u9009\u62e9\u8981\u6dfb\u52a0\u5230\u5206\u7c7b\u3010' + b + "\u3011\u7684\u6587\u7ae0\uff08\u53ef\u591a\u9009\uff09\uff01\x3c/div\x3e");
      for (var f = 0; f < art_my[a][0].length; f++) e += '\x3ca href\x3d"javascript:;" id\x3d"art_' + art_my[a][0][f][0] + '" onclick\x3d"select_art_to_tag(this)"\x3e' + art_my[a][0][f][1] + "\x3c/a\x3e";
      e = e + ('\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e\x3cdiv class\x3d"tag_form"\x3e\u9009\u62e9\u5b8c\u6210\uff0c\u5c06\u9009\u62e9\u6587\u7ae0\u79fb\u52a8\u5230\u65b0\u7684\u5206\u7c7b\uff01\x3cinput onclick\x3d"new_tag_art(\'' + a + "','" + b + "','" + c + '\')" type\x3d"button" value\x3d" \u63d0\u4ea4 "\x3e\x3c/input\x3e\x3c/div\x3e') + '\x3cdiv class\x3d"clear"\x3e\x3c/div\x3e\x3c/div\x3e';
      G("art_ul_" + a).innerHTML = e
    } else alert("\u60a8\u6ca1\u6709\u672a\u5206\u7c7b\u7684\u6587\u7ae0\uff0c\u5148\u53bb\u6536\u85cf\u6216\u6dfb\u52a0\u6587\u7ae0\u518d\u5206\u7c7b\u5427\uff01")
  };
  select_art_to_tag = function(a) {
    a.className = "check" == a.className ? "": "check"
  };
  new_tag_art = function(a, b, c, e) {
    var f = e ? [e] : "";
    if ("" == f) {
      e = document.getElementById("art_ul_" + a).getElementsByTagName("a");
      for (var f = [], d = 0; d < e.length; d++)"check" == e[d].className && f.push(e[d].id.substr(4))
    }
    if (0 == f.length) return alert("\u8bf7\u81f3\u5c11\u9009\u62e9\u4e00\u4e2a\u6587\u7ae0\uff01"),
    !1;
    e = new Date;
    d = new AjaxClass;
    d.Method = "GET";
    d.Url = "jingsai_do.php?do\x3dnew_tag_art\x26art\x3d" + f.join(",") + "\x26type\x3d" + a + "\x26tag_name\x3d" + encodeURI(b) + "\x26tag_id\x3d" + c + "\x26t\x3d" + e.getTime();
    d.Async = !0;
    d.Loading = function() {};
    d.CallBack = function(b) {
      b && ("ok" == b ? (alert("\u6210\u529f\u6dfb\u52a0\uff01"), window.location = "?do\x3dgroupnew\x26fav_type\x3d" + a + "\x26fav_id\x3d" + f[0] + "\x26load_tag\x3d" + c) : alert(b))
    };
    d.Send()
  }
})();


function reset_form() {
  var c = G("radio_en"),
  b = G("time");
  c.checked = "checked";
  b.value = "5";
  c.click()
}
function select_style(c) {
  var b = G("select_style");
  G("style_black").setAttribute("class", "style_black");
  b.value == c ? (b.value = "0", G("style_" + c).setAttribute("class", "style_" + c)) : (b.value = c, G("style_" + c).setAttribute("class", "style_" + c + " style_on"))
}
function check_set() {
  var c = G("name"),
  b = G("pass_old"),
  h = G("pass1"),
  l = G("pass2"),
  k = G("email"),
  n = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  g = !0;
  "" == c.value ? (set_info(c, "\u7528\u6237\u540d\u4e0d\u80fd\u4e3a\u7a7a\uff01", "login_info"), g = !1) : set_info(c, "", "info");
  0 < k.value.length && (n.test(k.value) ? set_info(k, "", "info") : (set_info(k, "E-mail\u683c\u5f0f\u4e0d\u6b63\u786e\uff01", "login_info"), g = !1));
  b && 0 < b.value.length && (6 > b.value.length ? (set_info(b, "\u5bc6\u7801\u4e0d\u80fd\u5c0f\u4e8e6\u4f4d\uff01", "login_info"), g = !1) : set_info(b, "", "info"));
  0 < h.value.length && (6 > h.value.length ? (set_info(h, "\u5bc6\u7801\u4e0d\u80fd\u5c0f\u4e8e6\u4f4d\uff01", "login_info"), g = !1) : b ? b.value == h.value && (set_info(h, "\u65b0\u5bc6\u7801\u4e0d\u80fd\u548c\u65e7\u5bc6\u7801\u76f8\u540c\uff01", "login_info"), g = !1) : set_info(h, "", "info"), h.value != l.value ? (set_info(l, "\u4e24\u6b21\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u81f4\uff01", "login_info"), g = !1) : set_info(l, "", "info"));
  return g ? !0 : !1
}
function set_info(c, b, h) {
  c = c.parentNode.parentNode.getElementsByTagName("span").item(2);
  c.innerHTML = b;
  c.className = h
}
function form_focus() {
  var c = G("name"),
  b = G("pass");
  c && ("" == c.value ? c.focus() : b && b.focus())
}
var __daojishi = null;
function send_email(c) {
  var b = G("email").value,
  h = G("code_img") ? "\x26type\x3d2\x26code_img\x3d" + G("code_img").value: "\x26type\x3d1";
  daojishi(c, 0);
  var l = new Date,
  k = new AjaxClass;
  k.Method = "GET";
  k.Url = "jingsai_do.php?do\x3demail_yz\x26email\x3d" + b + h + "\x26t\x3d" + l.getTime();
  k.Async = !0;
  k.Loading = function() {};
  k.CallBack = function(b) {
    "ok" == b ? alert("\u9a8c\u8bc1\u7801\u5df2\u53d1\u9001\u81f3\u60a8\u7684\u90ae\u7bb1\uff0c\u8bf7\u767b\u5f55\u90ae\u7bb1\u67e5\u6536\u90ae\u4ef6\uff01\n\u5982\u679c\u3010\u6536\u4ef6\u7bb1\u3011\u4e2d\u6ca1\u6709\u90ae\u4ef6\uff0c\u8bf7\u68c0\u67e5\u3010\u5783\u573e\u4fe1\u7bb1\u3011\uff0c\u5e76\u5c06\u90ae\u4ef6\u79fb\u56de\u3010\u6536\u4ef6\u7bb1\u3011\uff0c\u8c22\u8c22\uff01") : (clearTimeout(__daojishi), daojishi(c, 60), alert(b))
  };
  k.Send()
}
function check_email_change(c, b) {
  c.value != b ? G("email_yz_li").style.display = "block": G("email_yz_li").style.display = "none"
}
function daojishi(c, b) {
  clearTimeout(__daojishi);
  60 <= b ? (c.onclick = function() {
    send_email(c)
  },
  c.style.color = "", c.innerHTML = "\u70b9\u6b64\u53d1\u9001\u9a8c\u8bc1\u7801\u5230\u90ae\u7bb1") : (c.onclick = function() {
    return ! 1
  },
  c.style.color = "#666", c.innerHTML = "\u7b49\u5f85\x3cstrong\x3e" + (60 - b) + "\x3c/strong\x3e\u79d2\u540e\u91cd\u65b0\u53d1\u9001", __daojishi = setTimeout(function() {
    daojishi(c, b + 1)
  },
  1E3))
}
function show_sys_art(c) {
  document.location = c.checked ? "my_typing.php?do\x3dart\x26myart\x3d1": "my_typing.php?do\x3dart"
}
function show_order_art(c) {
  document.location = "art_0_" + c + ".html"
}
function quxian_show(c, b) {
  var h = document.getElementsByTagName("tr"),
  l = b.parentNode.parentNode.parentNode,
  k = l.getElementsByTagName("tr").item(1);
  if ("tr_flash_on" != k.className) {
    for (var n = 0; n < h.length; n++)"tr_flash_on" == h.item(n).className && (h.item(n).className = "tr_flash", h.item(n).parentNode.className = "");
    l.className = "on";
    k.className = "tr_flash_on"
  } else k.className = "tr_flash",
  l.className = ""
}
function change_head_img(c) {
  c ? (G("head_img_img").src = "style/images/head_img/" + c + ".bmp", G("head_img_div").style.display = "none", G("head_img_input").value = c) : G("head_img_div").style.display = "block"
}
var nIntervId_my = null;
function show_my_more(c) {
  clearTimeout(nIntervId_my);
  c.className = "userinfo2";
  c.onmouseout = function() {
    nIntervId_my = setTimeout(function() {
      c.className = "userinfo"
    },
    100)
  }
}
function show_top_userinfo() {
  setTimeout(function() {
    G("top_userinfo").className = "userinfo"
  },
  2500);
  for (var c = 0; 6 > c; c++) setTimeout(function() {
    "" == G("jy_bg").className ? G("jy_bg").className = "jy_bg": G("jy_bg").className = ""
  },
  200 * c)
}
function show_u_more(c, b, h, l) {
  var k = setTimeout(function() {
    var k = c.parentNode,
    g = k.getElementsByTagName("div"),
    a;
    if (0 == g.length) {
      g = document.createElement("div");
      g.setAttribute("class", "u_more");
      var p = '\x3cspan class\x3d"uinfo"\x3e\x3cimg src\x3d"style/images/head_img/' + h + '.bmp"/\x3e\x3cspan class\x3d"uinfo2"\x3e\x3cstrong\x3e' + l + "\x3c/strong\x3e\x3cbr/\x3e\x3cspan\x3eID:" + b + "\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e";
      if ("undefined" != typeof friend_list) var m = c.getElementsByTagName("span"),
      m = 1 == m.length ? m.item(0).innerHTML: "",
      p = p + ('\x3cspan class\x3d"ubeizhu"\x3e\x3cinput class\x3d"beizhu_i" name\x3d"beizhu" maxlength\x3d"10" type\x3d"input" value\x3d"' + m + '"\x3e\x3cinput class\x3d"beizhu_b" onclick\x3d"xiugai_beizhu(this,' + b + ')" type\x3d"button" value\x3d"\u8bbe\u5907\u6ce8"\x3e\x3c/span\x3e'),
      p = "undefined" != typeof friend_list[b] ? 1 == friend_list[b] ? p + ('\x3cspan class\x3d"span_a"\x3e\u5df2\u662f\u597d\u53cb\x3c/span\x3e\x3ca href\x3d"my_typing.php?do\x3dmessage_show\x26friend_id\x3d' + b + '"\x3e\u53d1\u6d88\u606f\x3c/a\x3e') : 2 == friend_list[b] ? p + '\x3cspan class\x3d"span_a" onclick\x3d"alert(\'\u5bf9\u65b9\u5df2\u62d2\u7edd\u60a8\u7684\u597d\u53cb\u7533\u8bf7\uff01\')"\x3e\u5bf9\u65b9\u62d2\u7edd\x3c/span\x3e\x3cspan class\x3d"span_a" onclick\x3d"alert(\'\u8bf7\u5148\u6dfb\u52a0\u597d\u53cb\uff0c\u7136\u540e\u624d\u80fd\u53d1\u9001\u6d88\u606f\u54e6\uff01\')"\x3e\u53d1\u6d88\u606f\x3c/span\x3e': p + '\x3cspan class\x3d"span_a" onclick\x3d"alert(\'\u60a8\u5df2\u7533\u8bf7\u6dfb\u52a0\u5bf9\u65b9\u4e3a\u597d\u53cb\uff0c\u8bf7\u7b49\u5f85\u5bf9\u65b9\u786e\u8ba4\uff01\')"\x3e\u5f85\u786e\u8ba4\x3c/span\x3e\x3cspan class\x3d"span_a" onclick\x3d"alert(\'\u8bf7\u5148\u6dfb\u52a0\u597d\u53cb\uff0c\u7136\u540e\u624d\u80fd\u53d1\u9001\u6d88\u606f\u54e6\uff01\')"\x3e\u53d1\u6d88\u606f\x3c/span\x3e': p + ('\x3ca href\x3d"my_do.php?do\x3dfriendnew\x26friend_id\x3d' + b + '"\x3e\u52a0\u597d\u53cb\x3c/a\x3e\x3cspan class\x3d"span_a" onclick\x3d"alert(\'\u8bf7\u5148\u6dfb\u52a0\u597d\u53cb\uff0c\u7136\u540e\u624d\u80fd\u53d1\u9001\u6d88\u606f\u54e6\uff01\')"\x3e\u53d1\u6d88\u606f\x3c/span\x3e');
      g.innerHTML = p;
      g.onmouseout = function() {
        a = setTimeout(function() {
          k.getElementsByTagName("div").item(0).style.display = "none"
        },
        100)
      };
      g.onmouseover = function() {
        clearTimeout(a)
      };
      k.appendChild(g)
    } else g.item(0).style.display = "block"
  },
  400);
  c.onmouseout = function() {
    clearTimeout(k)
  }
}
function xiugai_beizhu(c, b) {
  var h = c.parentNode.getElementsByTagName("input").item(0);
  window.location = "my_do.php?do\x3dfriend_beizhu\x26id\x3d" + b + "\x26name\x3d" + encodeURI(h.value)
}
function show_shurufa_all() {
  for (var c = document.getElementById("info_shurufa").getElementsByTagName("a"), b = 0; b < c.length; b++)"srf_hidden" == c.item(b).className && (c.item(b).className = ""),
  "more" == c.item(b).className && (c.item(b).className = "srf_hidden")
}
function AjaxClass() {
  function c() {
    var b = document.createElement("iframe");
    b.attachEvent("onload",
    function() {
      h.CallBack(b.contentWindow.document.body.innerHTML);
      b.removeNode()
    });
    b.attachEvent("onreadystatechange",
    function() {});
    b.src = h.Url;
    b.style.display = "none";
    document.body.appendChild(b)
  }
  var b = !1;
  try {
    b = new XMLHttpRequest
  } catch(l) {
    try {
      b = new ActiveXObject("MSXML2.XMLHTTP")
    } catch(k) {
      try {
        b = new ActiveXObject("Microsoft.XMLHTTP")
      } catch(n) {
        alert("\u4f60\u7684\u6d4f\u89c8\u5668\u4e0d\u652f\u6301XMLHTTP\u5bf9\u8c61\uff0c\u8bf7\u5347\u7ea7\u5230IE6\u4ee5\u4e0a\u7248\u672c\uff01"),
        b = !1
      }
    }
  }
  var h = this;
  this.Method = "POST";
  this.Url = "";
  this.Async = !0;
  this.Arg = "";
  this.CallBack = function() {};
  this.Loading = function() {};
  this.Send = function() {
    if ("" == this.Url) return ! 1;
    if (!b) return c();
    b.open(this.Method, this.Url, this.Async);
    "POST" == this.Method && b.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    b.onreadystatechange = function() {
      if (4 == b.readyState) {
        var c = !1;
        200 == b.status && (c = b.responseText);
        b = null;
        h.CallBack(c)
      } else h.Loading()
    };
    "POST" == this.Method ? b.send(this.Arg) : b.send(null)
  }
}
function load_user_beizhu() {
  if ("undefined" != typeof friend_beizhu) for (var c = document.getElementsByTagName("span"), b = 0; b < c.length; b++) {
    var h = c[b].className;
    "uid_" == h.substring(0, 4) && (h = h.replace("uid_", ""), "undefined" != typeof friend_beizhu[h] && (c[b].innerHTML = friend_beizhu[h], c[b].style.color = "#930"))
  }
};
