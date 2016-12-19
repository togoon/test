import React, { PureComponent as Component, PropTypes } from 'react';
import { css, border, ptr, bg, hsl, flex, sz } from './utils/cssobj.js'
import cx from 'classnames'

const S = css({

  main: {
    ...border, ...flex,
    width: 150,
    flexWrap: "wrap",
    alignContent: "flex-start",
  },

  item: {
    ...flex('><'), ...border, ...ptr, ...sz(70),
    marginLeft: 2,
  },

  picked: bg(hsl(178, 32, 75)),

  title : {
    ...flex('><'), ...border,
    ...sz("100%", 30),
    ...bg(hsl(225, 27, 83)),
  },
  

})

class ToolPanel extends Component {

  // 初步体验了一下PS模式
  constructor(p) {
    super(p)

    this.state = {
      data : [
        {
          name: "Mysql",
          type: 'mysql',
        },
        {
          name: "Storage",
          type: 'storage',
        },
        {
          name: "Tomcat",
          type: 'tomcat',
        },
      ],
      sel : p.sel, // 当前选中的，缺省为null
    }
  }

  componentWillReceiveProps(np) { 
    this.setState({ sel: np.sel })
  }
  
  onClick(i) {
    const p = this.props
    
    this.setState({sel:i})
    p.onPick(i)
  }

  render() {
    let s = this.state
    return <div className={S.main}>
      <div className={S.title}>组件库</div>
      {s.data.map( (v,i) => 
        <div key={i} className={cx(S.item, { [S.picked] : s.sel === v.type })}  onClick={this.onClick.bind(this, v.type)}>
          {v.name}
        </div> 
      )}
    </div>
  }
}

let { any} = PropTypes
ToolPanel.propTypes = {
  sel : any,
  onPick : PropTypes.func, // 选中一个画刷（图元）的回调 (idx)
}

export default ToolPanel

