import React, { PropTypes } from 'react'

// 注：这里用函数来创建组件，显得更简洁
const Todo = ({ onClick, completed, text }) => (
  // onClick 响应由外部传入
  <li
    onClick={onClick}
    style={{
      textDecoration: completed ? 'line-through' : 'none'
    }}
  >
    {text}
  </li>
)

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo
