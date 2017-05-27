/*
 * 力学模拟初探
 *
 * 这里面的数据结构跟composer有点类似（分开links和nodes存储），值得参考其思路
 *
 */
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

var simulation = d3.forceSimulation()
  /*
   * 给虚拟世界添加力
   * 第一个参数作为名字可以任意取，仅用于后续移除
   */
  .force("link", d3.forceLink().id( function(d) { 
    return d.id;  // 指定如何取id
  }))
  .force("charge", d3.forceManyBody()) // 这指的是万有引力场？
  .force("center", d3.forceCenter(width / 2, height / 2)); // 中心引力？

d3.json("miserables.json", function(error, graph) {
  if (error) throw error;

  /*
   * 以下边和点的初始代码都是常规的d3套路
   */

  // 边
  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links) // 绑定link数据
    .enter().append("line");

  // 点
  var node = svg.append("g")
      .attr("class", "nodes")
    .selectAll("circle")
    .data(graph.nodes) // nodes
    .enter().append("circle")
      .attr("r", 2.5)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.append("title")
      .text(function(d) { return d.id; });

  /*
   * 以下是将力学模拟与数据关联
   */
  simulation
    .nodes(graph.nodes) // 关联nodes，同时也进化数据
    .on("tick", ticked);  // 

  simulation.force("link")
    .links(graph.links); // 关联links，会将links里面的数据进化成更高级的形态

  /*
   * 在tick事件里，真正绘制每一个点和每一条边的坐标
   */
  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node
        .attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  }

});

function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

