function addImg() {
  const img = document.createElement('img')
  img.src = '/b.png'
  document.body.appendChild(img)
}

window.onload = ()=>{
  console.log('load')
}
