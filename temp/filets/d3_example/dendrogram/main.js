/*
 * 一个树状图的demo
 * 非常经典！也就是常见的思维导图采用的ui形式
 *
 * 演示cluster的使用
 */
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    g = svg.append("g").attr("transform", "translate(40,0)");

var tree = d3.cluster()
  /*
   * 这个size好像是用来指定坐标尺寸的。
   * 因为最终cluster对象会给一个层次数据结构分配坐标，因为需要知道尺寸信息
   */
  .size([height, width - 160]);

/*
 * stratify是一个非常重要的函数: 
 * 将一个二维关系表格拼装成树状结构
 */
var stratify = d3.stratify()
  .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); }); // 需要指定一个获取父节点id的方法

d3.csv("flare.csv", function(error, data) {
  if (error) throw error;

  // 得到解析后的层级关系对象
  var root = stratify(data)
    /*
     * 调用sort方法，可以令数据在保持层次结构的同时，处于同一层级的节点能按照一定的顺序排序，详见文档
     */
    .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

  /*
   * d3 cluster的精髓，给root里的每个节点注入布局时需要用到的坐标
   */
  tree(root);

  /*
   * 接下来就可以拿root里的数据来渲染出酷炫的树状图了
   */

  var link = g.selectAll(".link")
      .data(root.descendants().slice(1))
    .enter().append("path")
      .attr("class", "link")
      .attr("d", function(d) {
        return "M" + d.y + "," + d.x
            + "C" + (d.parent.y + 100) + "," + d.x
            + " " + (d.parent.y + 100) + "," + d.parent.x
            + " " + d.parent.y + "," + d.parent.x;
      });

  var node = g.selectAll(".node")
      .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
      .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  node.append("circle")
      .attr("r", 2.5);

  node.append("text")
      .attr("dy", 3)
      .attr("x", function(d) { return d.children ? -8 : 8; })
      .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); });
});

