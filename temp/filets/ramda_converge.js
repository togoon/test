import R from 'ramda'
/*
 * converge的功能类似放大镜的聚焦
 */
var average = R.converge(R.divide, [R.sum, R.length])
console.log(average([1, 2, 3, 4, 5, 6, 7]))
