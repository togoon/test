// 演示如何用fetch获得下载的进度
function consume(reader) {
  var total = 0
  return new Promise((resolve, reject) => {
    function pump() {
      reader.read().then(({done, value}) => {
        if (done) {
          resolve();
          return;
        }
        total += value.byteLength;
        console.log(`received ${value.byteLength} bytes (${total} bytes in total)`);
        pump();
      }).catch(reject)
    }
    pump();
  });
}
fetch('https://api.github.com/gists')
  .then(res => consume(res.body.getReader()))
  .then(() => console.log("consumed the entire body without keeping the whole thing in memory!"))
  .catch(e => console.log("something went wrong: " + e));
