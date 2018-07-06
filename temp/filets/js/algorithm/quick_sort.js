/*
 * 快速排序
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function partition(arr, a, b) {
  let i = a
  let j = a+1
  for(;j<=b;j++) {
    if ( arr[j] < arr[a]  ) {
      i++
      swap(arr, i, j)
    } 
  }
  swap(arr, a, i)
  return i
}

function sort(arr, a = 0, b = arr.length) {
  if (a >= b) {
    return
  } 
  const i = partition(arr, a, b)
  sort(arr, a, i-1)
  sort(arr, i+1, b)
}

const arr = [2, 5, 3, 10, 6, 8, 7, 9, 1, 4,]
sort(arr)
console.log(arr)
