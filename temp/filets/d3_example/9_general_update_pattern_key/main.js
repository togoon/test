/*
 * 随机字母例子2
 * 注意比较与上一个例子的区别，进一步巩固对enter, update, exit三个事件的理解
 */

// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabet = "abcdef".split(""); // 

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

function render(data) {

  var text = g.selectAll("text")
    .data(data, function(d) { return d; });

  text.attr("class", "update");

  text.enter().append("text")
      .attr("class", "enter")
      .attr("dy", ".35em")
      .text(function(d) { return d; })
    .merge(text)
      .attr("x", function(d, i) { return i * 32; });

  text.exit().remove();
}

render(alphabet);

d3.interval(function() {
  const data = d3.shuffle(alphabet)
    .slice(0, Math.floor(Math.random() * alphabet.length))
    .sort()

  console.log("data", data.join(''))

  render(data);
}, 3000);

