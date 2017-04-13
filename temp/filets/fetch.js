// fetch示例
fetch("http://www.example.org/submit.php", {
  method: "POST",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded" // 这个header不能少，否则服务端不会按照form的方式来解析参数
  },
  body: "firstName=Nikhil&favColor=blue&password=easytoguess"
}).then(function(res) {
  if (res.ok) {
    alert("Perfect! Your settings are saved.");
    // 在这里可以取
    // res.json(), res.text() 等方法...，但都是promise！
    // 而且这里似乎有一个坑就是，这些方法只能调用一次？如果调用多次只是逻辑意图上的警告，还是会出错？

  } else if (res.status == 401) {
    alert("Oops! You are not authorized.");
  }
}, function(e) {
  alert("Error submitting form!");
});
