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
  } else if (res.status == 401) {
    alert("Oops! You are not authorized.");
  }
}, function(e) {
  alert("Error submitting form!");
});
