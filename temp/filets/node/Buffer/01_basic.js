const buf = Buffer.from('abc', // encoding 缺省为utf8
)

/*
 * 只要参与+号运算，都会被转为string，即使是两个Buffer相加
 */
console.log(''+buf)

