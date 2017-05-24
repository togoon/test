/*
 * 介绍ordinal scale中band scale的使用
 * 最简单的ordinal scale本例中没有涵盖，而是直接使用了进阶的band scale
 * band scale 就是将离散的点映射到连续域中的一段一段（简直就是为柱状图案量身定做的）
 * 事实上composer里输入输出的点的分布，就可以使用上band scale
 * 之前我自己实现的算法，至今还不能完全居中
 */

var width = 960,
    height = 500;

/*
 * x轴用的是band scale
 * range（值域）与linear scale一致
 * round(true) 好像是用来设置两边留空？
 * padding 设置的值为相对于step（间隔）的比例，而不是相对于柱子宽度的比例，因此其范围只能0 ~ 1
 */
var x = d3.scaleBand().range([0, width]).round(true).padding(0.1)

var y = d3.scaleLinear()
    .range([height, 0]);

var chart = d3.select(".chart")
    .attr("width", width)
    .attr("height", height);

d3.tsv("data.tsv", type, function(error, data) {

  x.domain(data.map(function(d) { return d.name; }));
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x(d.name) + ",0)"; });

  bar.append("rect")
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.bandwidth());

  bar.append("text")
      .attr("x", x.bandwidth() / 2)
      .attr("y", function(d) { return y(d.value) + 3; })
      .attr("dy", ".75em")
      .text(function(d) { return d.value; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

