var net = require('net');

var client = new net.Socket();
client.connect(51312, 'localhost', function() {
	console.log('Connected');
  client.write(`GET /aa/bb?x=1&y=2#kkk HTTP/1.1
host: xxx
a: heihei
b: yyy

`);
});

client.on('data', function(data) {
  console.log('============get data==============')
  console.log(data.toString())
});

