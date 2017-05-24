/*
 * 通过字母的变化来演示d3数据绑定的设计模式
 * 演示数据增加、减少、变化的情况
 * 演示merge的使用
 */
// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabet = "abcdef".split(""); // 将集合缩小一点，方便观察 enter 跟 update 的区别

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

function render(data) {

  // 固定的d3套路代码
  var text = g.selectAll("text")
    .data(data);

  /*
   * update即刷新。直接操作对象即可
   */
  text.attr("class", "update");

  text.enter().append("text")
    .attr("class", "enter")
    .attr("x", function(d, i) { return i * 32; })
    .attr("dy", ".35em")
    /*
     * 以上的逻辑只应用于enter
     */

    /*
     * merge在这里扮演很晦涩但是也很关键的角色
     * 以下逻辑既应用的enter，也应用于update
     * 
     * 从这里的逻辑，能看到一些react的思想的原型
     * react将这些过程体现在componentDidMount，componentDidUpdate等事件中
     */
    .merge(text) 
    .text(function(d) { return d; });

  // exit即将其删除
  text.exit().remove();
}

// 初始渲染
render(alphabet);

// 每隔1秒钟刷新一把，数据随机生成。
d3.interval(function() {
  const data = d3.shuffle(alphabet)
    .slice(0, Math.floor(Math.random() * alphabet.length))
    .sort()

  console.log("data", data.join(''))

  render(data);
}, 3000);

