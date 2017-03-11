/*
 * 针对 <url:./request.js> 进行了mock，因此它们的导出接口必须是一致的
 * 如何在测试用例中使用mock的模块，见 <url:../user.test.js>
 */

const users = {
  4: {name: 'Mark'},
  5: {name: 'Paul'},
};

/*
 * 用jest.fn来包装一层是为了在测试的时候对函数的调用情况进行一些统计
 * 详见文档
 */
export const request = jest.fn(function(url) { 
  return new Promise((resolve, reject) => {
    const userID = parseInt(url.substr('/users/'.length), 10);
    users[userID] ? resolve(users[userID]) : reject({
      error: 'User with ' + userID + ' not found.',
    })
  });
})

export default request
