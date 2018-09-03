/*
 * mapProps: 顾名思义
 */
import React from 'react'
import { render } from 'react-dom'
import {mapProps} from 'recompose'

@mapProps(({name})=>({name:name.toUpperCase()}))
class Test extends React.PureComponent {
  render() {
    const {name} = this.props
    return <div>{name}</div>
  }
}

render(<Test name='haha' />, document.getElementById('root'))
