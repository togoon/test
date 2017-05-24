/*
 * 演示d3的异步加载数据的功能
 * 演示scale动态设置定义域
 */
var width = 420,
    barHeight = 20;

/*
 * 由于数据还未知，暂时未设置定义域
 */
var x = d3.scaleLinear()
    .range([0, width]);

var chart = d3.select(".chart")
    .attr("width", width);

/*
 * 加载tsv文件, 第二个参数type是个过滤器
 */
d3.tsv("data.tsv", type, function(error, data) {

  /*
   * 结构为 [ {name, value} ]
   */
  console.log("tsv data", data)

  // 设置定义域
  x.domain([0, d3.max(data, function(d) { return d.value; })]);

  // 以下的逻辑跟上例一致
  chart.attr("height", barHeight * data.length);

  var bar = chart.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.value); })
      .attr("height", barHeight - 1);

  bar.append("text")
      .attr("x", function(d) { return x(d.value) - 3; })
      .attr("y", barHeight / 2)
      .attr("dy", ".35em")
      .text(function(d) { return d.value; });
});

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

