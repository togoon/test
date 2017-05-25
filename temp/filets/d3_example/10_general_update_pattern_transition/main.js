/*
 * 随机字母，加入动画效果
 * d3的transition设计得令动画技能就是一个插件一样，装上就立马见效。其设计思想还是很先进的
 */
var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

function render(data) {

  /*
   * 定义一个transition
   */
  var t = d3.transition()
      .duration(750);

  var text = g.selectAll("text")
    .data(data, function(d) { return d; });

  /*
   * 指定退出动画
   */
  text.exit()
      .attr("class", "exit")
    .transition(t) /// 
      .attr("y", 60)
      .style("fill-opacity", 0)
      .remove();

  /*
   * update的动画
   */
  text.attr("class", "update")
      .attr("y", 0)
      .style("fill-opacity", 1)
    .transition(t) ///
      .attr("x", function(d, i) { return i * 32; });

  /*
   * enter动画
   */
  text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .attr("y", -60)
      .attr("x", function(d, i) { return i * 32; })
      .style("fill-opacity", 1e-6)
      .text(function(d) { return d; })
    .transition(t)
      .attr("y", 0)
      .style("fill-opacity", 1);
}

render(alphabet);

d3.interval(function() {
  render(d3.shuffle(alphabet)
      .slice(0, Math.floor(Math.random() * 26))
      .sort());
}, 1500);

