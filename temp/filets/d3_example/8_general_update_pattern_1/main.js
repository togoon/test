/*
 * 通过字母的变化来演示d3数据绑定的设计模式
 */
// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabet = "abcdef".split("");

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

function render(data) {

  // DATA JOIN
  // Join new data with old elements, if any.
  var text = g.selectAll("text")
    .data(data);

  // UPDATE
  // Update old elements as needed.
  text.attr("class", "update");

  // ENTER
  // Create new elements as needed.
  //
  // ENTER + UPDATE
  // After merging the entered elements with the update selection,
  // apply operations to both.
  text.enter().append("text")
    .attr("class", "enter")
    .attr("x", function(d, i) { return i * 32; })
    .attr("dy", ".35em")
    .merge(text)
    .text(function(d) { return d; });

  // EXIT
  // Remove old elements as needed.
  text.exit().remove();
}

// 初始渲染
render(alphabet);

// 每隔1秒钟刷新一把，数据随机生成。
d3.interval(function() {
  render(d3.shuffle(alphabet)
    .slice(0, Math.floor(Math.random() * alphabet.length))
    .sort());
}, 1000);

