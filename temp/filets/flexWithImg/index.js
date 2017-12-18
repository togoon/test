// React 
/*
 * 演示一下flex和img结合使用时的一些坑
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import injectSheet from 'react-jss'
import {H} from './utils/components/Flex.js'

import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'

@injectSheet({
  items : {
  },
  other : {
    padding : '0 10px',
    flexShrink : 1,
    flexGrow : 1,
  },
  itemImg : {
    // width : '100%',
    // display : 'block',
    height: 120,
    maxWidth : '100%',
  },
})
class Test extends PureComponent {
  render() {
    const {classes:{
      items,
      other,
      itemImg,
    }} = this.props

    return <div style={{width:900, border:'1px solid black'}} >
      <H className={items}>
        <div className={other}>
          <div>
            <img src={img1} className={itemImg} alt="Responsive" />
          </div>
        </div>
        <div className={other}>
          <div>
            <img src={img2} className={itemImg} alt="Responsive" />
          </div>
        </div>
        <div className={other}>
          <div>
            <img src={img3} className={itemImg} alt="Responsive" />
          </div>
        </div>
        <div className={other}>
          <div>
            <img src={img4} className={itemImg} alt="Responsive" />
          </div>
        </div>
        <div className={other}>
          <div>
            <img src={img5} className={itemImg} alt="Responsive" />
          </div>
        </div>
      </H>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

