/*
 * 使用D3来生成一个最简单的柱状统计图例子
 * 对于事先使用过React这类利器的来说，这样的例子不需要D3也很容易做到。
 * 但即使这样，仍然有必要学习D3为这类工作提供了哪些强大的工具，得以在今后的工作中各取所长
 */
var data = [4, 8, 15, 16, 23, 42];

/*
 * 这是d3-scale的一个功能，它可以为你构造一个映射函数
 * 比如下面的linear scale的例子，只需要指定 定义域，值域，d3就已经理解你需要一个怎样的映射关系了
 * 最终返回一个函数（此处为x），直接拿去用即可
 */
var x = d3.scaleLinear()
    .domain([0, d3.max(data)]) // "定义域"
    .range([0, 420]); // "值域"

/*
 * 以下是利用d3来渲染的一个常用的套路
 */
d3.select(".chart") // 选到chart
  .selectAll("div") // 选到chart里面所有的div
    .data(data) // 绑定data，这时据说返回一个"用来update的对象"
  /*
   * enter方法似乎是用来指定新的数据如何来渲染
   * 似乎还有exit和update动作，后面再深究
   */
  .enter().append("div") 
  /*
   * 以下有点类似jquery里的dom操作方法
   */
  .style("width", function(d) { return x(d) + "px"; }) // 这里的d会对应data里的每一个元素
    .text(function(d) { return d; });

/*
 * 根据上面一系列的操作，d3将一个数组，对应到一组div
 */
