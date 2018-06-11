var word = '123',
    url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+word+'&json=1&p=3';
fetch(url,{mode: "no-cors"}).then(function(response) {
  return response;
}).then(function(data) {
  console.log(data);
}).catch(function(e) {
  console.log("Oops, error");
});
