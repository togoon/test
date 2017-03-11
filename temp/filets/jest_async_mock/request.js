/*
 * 这里本来是包含一些网络通信的代码
 * 由于在本例中这是被mock的对象，这里的代码在测试中不会被使用到
 * 故省略了具体的实现，mock的代码见 <url:./__mocks__/request.js>
 */

export default function request(url) {
  console.warn('not implemented!')
}
