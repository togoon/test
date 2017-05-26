/*
 * zoomable的 circle packing
 * > 演示d3-scale在颜色插值上的应用（即通过颜色的变化来直观表示一个值的变化）
 * > 演示如何在d3上响应事件
 */
var svg = d3.select("svg"),
  margin = 20,
  diameter = +svg.attr("width"),
  /*
   * 这里很关键，将原点移到画布中央
   */
  g = svg.append("g").attr("transform", "translate(" + diameter / 2 + "," + diameter / 2 + ")");

/*
 * 指定一个颜色的插值scale. 通过颜色的渐变来反映层次的深度
 * 前面基础的circle packing demo里没有使用这个技术，是用了一个简便的trick：通过设置一个颜色的透明度叠加而成
 */ 
var color = d3.scaleLinear()
  .domain([-1, 5])
  .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"]) // 这里使用的颜色格式与下面的插值体系(hcl)没有任何关系，只要能表示颜色就行
  .interpolate(d3.interpolateHcl);
  // .interpolate(d3.interpolateHsl); // 可以试试用hsl，rgb等维度来插值，会发现hcl比hsl要美观

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
        // zoomTo([d.x, d.y, d.r*2 + margin])
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
   * zoomTo里才为每个元素设置坐标以及大小
   * 三个参数分别是 坐标x, y, 直径
   */
  zoomTo([root.x, root.y, root.r * 2 + margin]);


  /*
   * 传入一个节点（数据节点），zoom到以其为中心的视角
   * 它其实是对zoomTo的一个动画状态的包装。
   * 如果不需要动画效果，直接将其"卸掉"换回zoomTo即可。插件化的思想体现得非常精妙！
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

  // 计算zoom到一个地方时，各个元素的坐标以及大小
  function zoomTo(v) {
    view = v // 更新view，本函数中并没有用到view变量，是作动画的时候用的

    var k = diameter / v[2]; // 先算出拉伸的比例系数

    /*
     * 所有元素进行变换
     * 此处的作法隐含着一些数学知识
     * 注：这里变换并不是相对于上一个zoom的变换，而是相对于原始大小的变换！
     * 因此计算比例也是相对于原始尺寸的比例
     *
     * 这里的zoom定位算法很值得回味，它并没有采用将整张图进行放大缩小的方式
     * 而是通过传入的view参数，逐个刷新每个元素的坐标和大小。这应该不是唯一的实现方法
     * 但为今后写算法开辟了一种新的思路
     */

    // 求得距离，再乘k倍
    node.attr("transform", function(d) { return "translate(" + (d.x - v[0]) * k + "," + (d.y - v[1]) * k + ")"; });
    // 所有圆放大k倍
    circle.attr("r", function(d) { return d.r * k; });
  }
});

