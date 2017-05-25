/*
 * 随机字母例子2
 * 重要区别是给 selection.data方法增加了一个key function函数（很接近react里的key的概念）
 *
 * key function很晦涩
 * 首先要理解它起的作用：定义数据和dom元素之间的映射关系
 * 在d3里，它被设计为一物二用：它的返回值就是一个key，但既用来计算数据的key，也用来计算dom元素的key
 * 通过比较key是否相同来得知谁和谁是绑定在一起
 *
 * 大致记录key function的参数机制（细节未完全梳理，详见文档）
 * 对于dom元素：传入: d: 当前数据，i: 当前index, nodes: 整个dom集合，this: nodes[i]
 * 对数据项：传入d, i, this为dom parent
 *
 * 进一步巩固对enter, update, exit三个事件的理解
 */

// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
var alphabet = "abcdef".split(""); // 

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height"),
  g = svg.append("g").attr("transform", "translate(32," + (height / 2) + ")");

function render(data) {

  var text = g.selectAll("text")
    /*
     * 关键！：这里指定了key function，指定key是绑定的数据本身，而不是在数组中的序号！
     */
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

