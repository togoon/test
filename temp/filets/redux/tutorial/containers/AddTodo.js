import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../actions'

// 其props是一个store？
// 其没有state
let AddTodo = ({ dispatch }) => {

  let input // 用闭包变量来引用子组件/元素

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }

        // 这里触发action!
        dispatch(addTodo(input.value))
        input.value = ''
      }}>

        <input ref={n=>input=n} />
        <button type="submit"> Add Todo </button>

      </form>
    </div>
  )
}

// 这个connect没有定义映射逻辑
// 因此你自己要用props来接纳整个store
AddTodo = connect()(AddTodo)

export default AddTodo
