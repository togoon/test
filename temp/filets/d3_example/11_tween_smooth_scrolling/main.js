/*
 * 这里的tween似乎跟react-motion里的spring有点像
 * 但似乎可以自定义更多的细节
 */
d3.transition()
    .delay(1500)
    .duration(7500)
    // 这里 'scroll' 的名字可以任意取，它主要是给删除的时候用的
    .tween("scroll", scrollTween(document.body.getBoundingClientRect().height - window.innerHeight));

function scrollTween(offset) {
  return function() {
    var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
    return function(t) { scrollTo(0, i(t)); };
  };
}

