/*
 * withState
 */
import React from 'react'
import { render } from 'react-dom'
import {withState} from 'recompose'

const enhance = withState('counter', 'setCounter', 0)
const Counter = enhance(({ counter, setCounter }) =>
  <div>
    Count: {counter}
    <button onClick={() => setCounter(n => n + 1)}>Increment</button>
    <button onClick={() => setCounter(n => n - 1)}>Decrement</button>
  </div>
)

render(<Counter />, document.getElementById('root'))
