jest.mock('./request.js');

import * as user from './user.js';

it('works with async/await', async () => {
  const userName = await user.getUserName(4);
  expect(userName).toEqual('Mark');
});
