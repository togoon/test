import React, { PureComponent } from 'react'
import { render } from 'react-dom'

import Link from './Link.js'

class App extends PureComponent {
  render() {
    return <div>
      <Link page="http://www.baidu.com">Facebook</Link>
    </div>  
  }
}

render(<App />, document.getElementById('root'))

