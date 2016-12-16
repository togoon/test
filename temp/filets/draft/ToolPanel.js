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
    ...flex, ...border, ...ptr, ...sz(70),
    // TODO: 后面用 >< 标记来表示这两个center，可以选的符号有：< > ^ v <|> >|< << >> <^ <-|> 后续好好研究一下它们的意义
    justifyContent: "center", 
    alignItems: "center",
  },

  picked: bg(hsl(178, 32, 75)),

  title : {
    
  },
  

})

class ToolPanel extends Component {

  // 初步体验了一下PS模式
  constructor(p) {
    super(p)

    this.state = {
      data : [
        "Mysql",
        "Storage",
        "Tomcat",
      ],
      sel : p.sel, // 当前选中的，缺省为null
    }
  }

  componentWillReceiveProps(np) { 
    this.setState({ sel: np.sel })
  }
  
  onClick(i) {
    let p = this.props
    
    this.setState({sel:i})
    p.onPick(i)
  }

  render() {
    let s = this.state
    return <div className={S.main}>
      <div className={S.title}>组件库</div>
      {s.data.map( (v,i) => 
        <div key={i} className={cx(S.item, { [S.picked] : s.sel === i })}  onClick={this.onClick.bind(this, i)}>
          {v}
        </div> 
      )}
    </div>
  }
}

ToolPanel.propTypes = {
  onPick : PropTypes.func, // 选中一个画刷（图元）的回调 (idx)
}

export default ToolPanel

