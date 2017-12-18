// React 
/*
 * 演示一下flex和img结合使用时的一些坑
 */
import React, { PureComponent } from 'react'
import {render,} from 'react-dom'
import injectSheet from 'react-jss'
import {H} from './utils/components/Flex.js'

/*
 * 以下5张图尺寸不是完全一样的。图1的宽、高为其他图的两倍
 */
import img1 from './img1.jpg'
import img2 from './img2.jpg'
import img3 from './img3.jpg'
import img4 from './img4.jpg'
import img5 from './img5.jpg'

@injectSheet({
  items : {
  },
  item : {
    padding : '0 10px',
    /*
     * 这里包含了flexBasis:0，如果是用其默认值的话，则大的图片的初始份额会更大，这将达不到平均分配空间的目的
     * 因此仅仅指定 flexShrink : 1, 是不行的
     */
    flex : 1, 
  },
  img : {
    /*
     * 如果不指定width的限制，则图片将会放飞自我，导致flex布局不生效
     */
    width : '100%', // 或者是maxWidth : '100%', 
    height: 120,
  },
})
class Test extends PureComponent {
  render() {
    const {classes:{
      items,
      item,
      img,
    }} = this.props

    return <div style={{width:900, border:'1px solid black'}} >
      <H className={items}>
        <div className={item}>
          <div>
            <img src={img1} className={img} alt="Responsive" />
          </div>
        </div>
        <div className={item}>
          <div>
            <img src={img2} className={img} alt="Responsive" />
          </div>
        </div>
        <div className={item}>
          <div>
            <img src={img3} className={img} alt="Responsive" />
          </div>
        </div>
        <div className={item}>
          <div>
            <img src={img4} className={img} alt="Responsive" />
          </div>
        </div>
        <div className={item}>
          <div>
            <img src={img5} className={img} alt="Responsive" />
          </div>
        </div>
      </H>
    </div>
  }
}

render(<Test />, document.getElementById('root'))

