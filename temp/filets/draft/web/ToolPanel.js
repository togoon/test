import React, { PureComponent } from 'react';
import { css, border, ptr, bg, hsl, flex, sz } from './utils/cssobj.js'
import cx from 'classnames'
import { connect } from 'react-redux'
import _ from 'lodash'

const S = css({

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

const s_btn = {
  marginLeft : 10,
  marginBottom : 5, 
}

class ToolPanel extends PureComponent {

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
        'tomcat', 'bp_A', 'bp_B', 'bp_C', 'My'
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

    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: 150,
    }}>
      <div style={{
        display: 'flex',
        flexWrap: "wrap",
        alignContent: "flex-start",
        flex: 1,
      }} >
      <div className={S.title}>Components</div>
        {s.data.map( (v,i) => {
          if ( !_.isObject(v) ) {
            v = { name: v, type: v }
          }
        
          return <div key={i} className={cx(S.item, { [S.picked] : s.sel === v.type })}  onClick={this.onClick.bind(this, v.type)}>
            {v.name}
          </div> 
        })}
      </div>
      <div>
        <button style={s_btn} >+ Input</button>
        <button style={s_btn} >+ Output</button>
      </div>
    </div>
  }
}

const sm = (s) => {
  return {
    sel : s.get('brush'),
  }
}

const dm = (d) => {
  return {
    onPick : (key)=>{ // 选中一个画刷（图元）的回调 (idx)
      d({ type: 'brush_set', val: key})
    },
  }
}

export default connect(sm, dm)(ToolPanel)

