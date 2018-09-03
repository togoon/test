/*
 */
import React from 'react'
import { render } from 'react-dom'
import {defaultProps} from 'recompose'

@defaultProps({name:'tom', age:10})
class Test extends React.PureComponent {
  render() {
    const {name, age} = this.props
    return <div>{name}:{age}</div>
  }
}

render(<Test name='jim' />, document.getElementById('root'))
