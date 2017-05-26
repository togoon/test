
d3.transition()
    .delay(1500)
    .duration(7500)
    .tween("scroll", scrollTween(document.body.getBoundingClientRect().height - window.innerHeight));

function scrollTween(offset) {
  return function() {
    var i = d3.interpolateNumber(window.pageYOffset || document.documentElement.scrollTop, offset);
    return function(t) { scrollTo(0, i(t)); };
  };
}

