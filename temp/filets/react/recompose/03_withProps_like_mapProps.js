/*
 * mapProps 演化到 withProps
 */
import React from 'react'
import { render } from 'react-dom'
import {withProps} from 'recompose'

@withProps(({name})=>({name:name.toUpperCase()}))
class Test extends React.PureComponent {
  render() {
    const {name, age} = this.props
    return <div>{name}:{age}</div>
  }
}

render(<Test name='haha' age={10} />, document.getElementById('root'))
