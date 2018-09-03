/*
 * undefined还是会占keys的（意味着也会占for in）
 */
let a = {n:1}
a.b = undefined
console.log(a.b === a.c)
console.log(Object.keys(a))
for(const key in a) {
  console.log('key', key)
}
