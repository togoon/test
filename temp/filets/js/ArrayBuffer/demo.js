const a = new Int8Array(4)
a[0] = 1


const b = new Int16Array(a.buffer)
b[1] = 1
console.log(a.buffer)

const c  = Buffer.from(a.buffer)
console.log(c)
