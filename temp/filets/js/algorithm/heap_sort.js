/*
 * 堆排序
 * 下标采用half open约定
 */
function swap(arr, i, j) {
  [arr[i], arr[j]] = [arr[j], arr[i]]
}

function bubble(arr, head, end) {
  let temp = arr[head]
  let j = head
  let i = head*2
  for(;i<end; i*=2) {
    // 取两兄弟较大者
    if ( i<end-1 && arr[i+1] > arr[i] ) {
      i++
    } 
    if ( arr[i] <= temp ) {
      break
    } 
    arr[j] = arr[i]
    j = i
  }
  arr[j] = temp
}

function make_heap(arr) {
  /*
   * 正好可以利用length/2, arr[0]不被使用
   */
  for(let i = arr.length/2; i>0; i--) {
    bubble(arr, i, arr.length)
  }
}

function sort(arr) {
  make_heap(arr)
  for(let i = arr.length-1; i>1; i--){
    swap(arr, 1, i)
    bubble(arr, 1, i)
  }
}

const arr = [null, 2, 12, 5, 3, 11, 10, 6, 8, 13, 7, 9, 1, 4,]
sort(arr)
console.log(arr)
