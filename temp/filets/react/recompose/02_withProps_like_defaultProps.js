/*
 * withProps 跟defaultProps() 区别是withProps会强行注入props，无视外界传入
 */
import React from 'react'
import { render } from 'react-dom'
import {withProps} from 'recompose'

@withProps({name:'tom', age:10})
class Test extends React.PureComponent {
  render() {
    const {name, age} = this.props
    return <div>{name}:{age}</div>
  }
}

render(<Test name='jim' />, document.getElementById('root'))
