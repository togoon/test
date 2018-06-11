const http = require('http') // 如果是https，则需要require('https')

http.get('http://jsonplaceholder.typicode.com/posts/1', function(response) {
  let body = '';
  response.on('data', function(d) { // d其实是Buffer类型
    body += d;
  });

  response.on('end', function() {
    console.log(body)
  });
});
