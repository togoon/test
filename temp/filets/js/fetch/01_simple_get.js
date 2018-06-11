(async ()=>{
  const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
  console.log(res.status)
  const data = await res.json()
  console.log(data)
})()
