/*
 * circle packing来展示层级结构图
 */
var svg = d3.select("svg"),
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(2,2)"),
    /*
     * 将1234 格式化为 1,234
     */
    format = d3.format(",d");

// 构造circle packing布局
var pack = d3.pack()
    .size([diameter - 4, diameter - 4]);

d3.json("flare.json", function(error, root) {
  if (error) throw error;

  root = d3.hierarchy(root)

  /*
   * 使用d3.pack必须要调用sum方法
   * node.sum需要传入一个获取节点"权重"的函数，也许d3需要这个值来决定每个pack的大小
   */
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var node = g.selectAll(".node")
    /*
     * pack之后，每个节点会获得三个关键的属性: 
     * 坐标：x, y, 半径：r
     */
    .data(pack(root).descendants())
    .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.data.name + "\n" + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; });

  node.filter(function(d) { return !d.children; }).append("text")
      .attr("dy", "0.3em")
      .text(function(d) { return d.data.name.substring(0, d.r / 3); });
});

