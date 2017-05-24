/*
 * bar chart的最终版
 * 手工处理了一下margin
 * 演示坐标轴的ticks的使用
 */
var svg = d3.select("svg"),
  margin = {top: 20, right: 20, bottom: 30, left: 40},
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom;

var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
  y = d3.scaleLinear().rangeRound([height, 0]);

var g = svg.append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.tsv("data.tsv", function(d) {
  d.frequency = +d.frequency;
  return d;
}, function(error, data) {
  if (error) throw error;

  x.domain(data.map(function(d) { return d.letter; }));
  y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

  g.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)); // 直接将坐标轴传进来

  g.append("g")
    .attr("class", "axis axis--y")
    .call(d3.axisLeft(y).ticks(10, "%")) // 10表示坐标轴上有10个刻度（但好像显示出来是12个，暂不深究）
    
    /*
     * 这里是增加一个坐标轴的描述
     */
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .attr("fill", "black")
    .text("Frequency");

  g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
    .attr("class", "bar")
    .attr("x", function(d) { return x(d.letter); })
    .attr("y", function(d) { return y(d.frequency); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return height - y(d.frequency); });
});
