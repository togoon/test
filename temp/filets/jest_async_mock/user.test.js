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
  console.log(request.mock.calls)
});
