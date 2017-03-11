/*
 * 指定mock request模块
 * 如果省略该句，将不mock该模块，而是执行真实的代码
 */
jest.mock('./request.js');

import * as user from './user.js';
import request from './request.js'

it('works with async/await', async () => {
  const userName = await user.getUserName(4);
  expect(userName).toEqual('Mark');

  /*
   * 由于request借助了jest.fn工具来实现，因此可以使用工具集里的一些方法
   * 比如下例，列出request函数的所有调用情况（参数列表）
   */
  console.log(request.mock.calls) 
});

