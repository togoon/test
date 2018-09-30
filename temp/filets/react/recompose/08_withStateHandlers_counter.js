/*
 * 用withStateHandlers来实现counter的例子
 */
import React from 'react'
import { render } from 'react-dom'
import {withStateHandlers} from 'recompose'

const countable = withStateHandlers(
  ({ initialCounter = 0 }) => ({
    counter: initialCounter,
  }),
  {
    addBy: ({ counter }) => (value) => ({
      counter: counter + value,
    }),
    subBy: ({ counter }) => (value) => ({
      counter: counter - value,
    }),
    reset: (_, { initialCounter = 0 }) => () => ({
      counter: initialCounter,
    }),
  }
)

@countable
class Counter extends React.PureComponent {
  render() {
    const {counter, addBy, subBy, reset} = this.props
    return <div>
      Count : {counter}
      <button onClick={()=>addBy(2)}>+</button>
      <button onClick={()=>subBy(3)}>-</button>
      <button onClick={reset}>reset</button>
    </div>
  }
}

render(<Counter />, document.getElementById('root'))
