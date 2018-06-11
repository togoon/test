fetch('https://jsonplaceholder.typicode.com/posts/', {
  method : 'POST',
  headers : {
    a : 'aa',
    b : 'bb',
  },
  body : `asfasfsadfsadfsadfasdfasfasfsd`,
})
  .then(response => response.json())
  .then(json => console.log(json))
