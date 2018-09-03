/*
 * 使用withState来创建一个countable的示例. 充分体现react的可拼装性
 * composibility
 */
import React from 'react'
import { render } from 'react-dom'
import {withState, withHandlers, compose} from 'recompose'

const countable = compose(
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ setCounter }) => () => setCounter(n => n + 1),
    decrement: ({ setCounter }) => () =>  setCounter(n => n - 1),
    reset: ({ setCounter }) => () => setCounter(0)
  })
)

@countable
class Counter extends React.PureComponent {
  render() {
    const {counter, increment, decrement, reset} = this.props
    return <div>
      Count : {counter}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  }
}

render(<Counter />, document.getElementById('root'))
