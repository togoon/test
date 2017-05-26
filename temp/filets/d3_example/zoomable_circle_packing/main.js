/*
 * zoomable的 circle packing
 * > 演示d3-scale在颜色插值上的应用（即通过颜色的变化来直观表示一个值的变化）
 * > 演示如何在d3上响应事件
 */
var svg = d3.select("svg"),
    margin = 20,
    diameter = +svg.attr("width"),
    g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

/*
 * 指定一个颜色的插值scale. 通过颜色的渐变来反映层次的深度
 * 前面基础的circle packing demo里没有使用这个技术，是用了一个简便的trick：通过设置一个颜色的透明度叠加而成
 */ 
var color = d3.scaleLinear()
    .domain([-1, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl);

// 定义一个circle packing
var pack = d3.pack()
    .size([diameter - margin, diameter - margin])
    .padding(2);

d3.json("flare.json", function(error, root) {
  if (error) throw error;

  root = d3.hierarchy(root) // hierarchy化，与上例相同
      .sum(function(d) { return d.size; })
      .sort(function(a, b) { return b.value - a.value; });

  var focus = root, // 指当前选中哪个节点，初始是root
    nodes = pack(root).descendants(), // 所有节点平铺

    view; // 保存当前的"视窗"，也就是zoomTo的参数（目标）

  var circle = g.selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("class", function(d) { return d.parent ? d.children ? "node" : "node node--leaf" : "node node--root"; })
    /*
     * 使用颜色坐标！酷！
     */
    .style("fill", function(d) { return d.children ? color(d.depth) : null; }) 
    /*
     * 响应点击事件
     */
    .on("click", function(d) { 
      /*
       * 太酷了！
       * 巧妙地通过focus和stopPropagation来实现zoom in之后再点一次可以zoom out
       */
      if (focus !== d) { 
        zoom(d)
        d3.event.stopPropagation() 
      }
    });

  var text = g.selectAll("text")
    .data(nodes)
    .enter().append("text")
      .attr("class", "label")
      .style("fill-opacity", function(d) { return d.parent === root ? 1 : 0; })
      .style("display", function(d) { return d.parent === root ? "inline" : "none"; })
      .text(function(d) { return d.data.name; });

  var node = g.selectAll("circle,text");

  svg
      .style("background", color(-1))
      .on("click", function() { zoom(root); });

  /*
   * zoom算法是核心关键点
   */


  /*
   * 这个zoomTo只是一些数据的初始化，并没有调用zoom函数
   * 三个参数分别是 坐标x, y, 直径
   */
  zoomTo([root.x, root.y, root.r * 2 + margin]);


  /*
   * 传入一个节点（数据节点），zoom到以其为中心的视角
   */
  function zoom(d) {
    console.log("zoom!!")

    var focus0 = focus; focus = d; // 记录原来的focus，更新当前的focus

    var transition = d3.transition()
    /*
     * 亮点！还可以根据altkey来放慢速度！！
     */
      .duration(d3.event.altKey ? 7500 : 750)
        .tween("zoom", function(d) {
          var i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2 + margin]);
          return function(t) { zoomTo(i(t)); };
        });

    transition.selectAll("text")
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
        .style("fill-opacity", function(d) { return d.parent === focus ? 1 : 0; })
        .on("start", function(d) { if (d.parent === focus) this.style.display = "inline"; })
        .on("end", function(d) { if (d.parent !== focus) this.style.display = "none"; });
  }

  function zoomTo(v) {
    view = v // 更新view
    var k = diameter / v[2]; // k是一个比例？
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    circle.attr("r", function(d) { return d.r * k; });
  }
});

