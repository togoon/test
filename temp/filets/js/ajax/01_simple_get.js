const xhr = new XMLHttpRequest()
xhr.open('GET', 'https://jsonplaceholder.typicode.com/posts/1')
xhr.onreadystatechange = ()=>{
  /*
   * 0 - 4分别对应：UNSENT, OPENED, HEADERS_RECEIVED, LOADING, DONE
   */
  if ( xhr.readyState === 4) {
    console.log(xhr.status, xhr.responseText)
  } 
}
xhr.send()
