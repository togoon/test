/*
 * bar chart的svg版本，用svg来实现与上个例子完全一样的画面效果
 */
var data = [4, 8, 15, 16, 23, 42];

var width = 420,
  barHeight = 20;

var x = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width]);

// 初始化svg元素的尺寸
var chart = d3.select(".chart") 
  .attr("width", width)
  .attr("height", barHeight * data.length);

// 绑定数据
var bar = chart.selectAll("g")
  .data(data)
  .enter().append("g") // 再次见到enter方法
  .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; }); // 回调可接收两个参数

// 画矩形
bar.append("rect")
  .attr("width", x)
  .attr("height", barHeight - 1); // 通过 -1 来留白

// 绘制文本
bar.append("text")
  .attr("x", function(d) { return x(d) - 3; })
  .attr("y", barHeight / 2)
  .attr("dy", ".35em")
  .text(function(d) { return d; });

