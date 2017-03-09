import React from 'react';
import Link from './Link.js';
import renderer from 'react-test-renderer';

/*
 * 针对Link的3个功能点进行测试 <url:./Link.js#测试的点>
 */
test('Link changes the class when hovered', () => {

  // 先创建一个实例
  const component = renderer.create(
    <Link page="http://www.baidu.com">Facebook</Link>
  );

  let tree = component.toJSON(); // 模拟render
  expect(tree).toMatchSnapshot(); // 与快照比对，快照文件在 ./__snapshot__/（路径相对于当前文件，而非相对于工程）目录下

  // 手动触发ui事件（模拟用户操作）
  tree.props.onMouseEnter(); 
  tree = component.toJSON(); // 再次render
  expect(tree).toMatchSnapshot(); // check

  // 其他操作同理
  tree.props.onMouseLeave();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
