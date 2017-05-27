/*
 * 画图板demo
 * > 演示如何用d3的设计模式给元素增加drag事件
 * > 演示d3.line的使用
 */

var line = d3.line() // 对d3.line的初始化配置
  .curve(d3.curveBasis);  // 指定曲线的类型，缺省为直的折线

var svg = d3.select("svg")
  .call(d3.drag() // 熟悉的d3链式模式
    .container(function() { return this; }) // container决定了drag的坐标系
    /*
     * subject起什么作用？
     */
    .subject(function() { 
      var p = [d3.event.x, d3.event.y]
      return [p, p]
    })
    .on("start", dragstarted))

function dragstarted() {
  var d = d3.event.subject

  const active = svg.append("path").datum(d)

  let x0 = d3.event.x
  let y0 = d3.event.y

  d3.event.on("drag", function() {
    var x1 = d3.event.x,
      y1 = d3.event.y,
      dx = x1 - x0,
      dy = y1 - y0;

    if (dx * dx + dy * dy > 100) {
      d.push([x0 = x1, y0 = y1])
    }
    else { 
      d[d.length - 1] = [x1, y1]
    }

    /*
     * selection.attr支持函数
     */
    active.attr("d", line);
  })
}

