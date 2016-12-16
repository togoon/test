import React, { PureComponent as Component, PropTypes } from 'react';
import Radium from 'radium';
import { border, ptr, bg, hsl, flex, sz } from './utils/cssobj.js'

const S = {
  main: {
    ...border, ...flex,
    width: 150,
  },

  item: {
    ...border, ...ptr, ...sz(70),
  }
}

class ToolPanel extends Component {

  // 初步体验了一下PS模式
  constructor(p) {
    super(p)

    this.state = {
      data : [
        "Mysql",
        "Storage",
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
    return <div style={S.main}>
      {s.data.map( (v,i) => 
        <div key={i} style={[S.item, i === s.sel ? bg(hsl(178, 32, 75)) : null]} onClick={this.onClick.bind(this, i)}>
          {v}
        </div> 
      )}
    </div>
  }
}

ToolPanel.propTypes = {
  onPick : PropTypes.func, // 选中一个画刷（图元）的回调 (idx)
}

export default Radium(ToolPanel);

