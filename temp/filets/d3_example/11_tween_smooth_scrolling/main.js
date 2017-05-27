/*
 * 这里的tween似乎跟react-motion有一些相似的思想
 */
d3.transition()
    .delay(1500)
    .duration(7500)
    /*
     * 这里 'scroll' 的名字可以任意取，它主要是给删除的时候用的
     * 第二个参数是一个函数，其原型为： (d,...) => t => {...}
     * 最终返回一个时间函数，其里面可以根据传入的时间插值来干任何事情，主要就是指定到底要如何体现动画
     * 思想很接近react motion
     */
    .tween("scroll", scrollTween(document.body.getBoundingClientRect().height - window.innerHeight));

function scrollTween(offset) {
  return function() {
    var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
    return function(t) { scrollTo(0, i(t)); };
  };
}

