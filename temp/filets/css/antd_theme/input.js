import React, { PureComponent} from 'react'
import {render} from 'react-dom'
import _ from 'lodash'
import injectSheet from 'react-jss'

import './iconfont.css'

const $ = (...p)=>_.merge({}, comm, ...p)

const lightGray = 'rgba(0,0,0,.25)'

const iconify = C => ({icon, ...props}) => {
  const padding = 30

  return <span style={{display : 'inline-block',position : 'relative'}} >
    <C {...$({style:{paddingLeft:padding - 3}}, props)} />
    <div style={{
      position : 'absolute',
      left : 0,
      top : 0,
      width : padding,
      height : '100%',
      display : 'flex',
      justifyContent : 'center', 
      alignItems : 'center',
      color : 'lightGray',
    }}>
      <i class={`iconfont icon-${icon}`} />
    </div>
  </span>
}

const Input = iconify('input')

const comm = {
  padding: "4px 11px",
  color: "rgba(0, 0, 0, 0.65)",
  borderRadius: "4px",
  borderStyle : 'solid',
  borderWidth : 1,

  width : 193,
  height : 32,
  boxSizing : 'border-box',

  transition: ".3s",
  '&:focus' : {
    outline : 'none',
  },
  '&::-webkit-input-placeholder' : {
    color : lightGray,
  },
}

function Gap() {
  return <div style={{display : 'inline-block',width:20}} />
}

@injectSheet({
  '@global' : {
    '@keyframes validationTipIn' : {
      from : {
        opacity : 0,
        transform : 'translateY(-5px)',
      },
      to : {
        opacity : 1,
        transform : 'translateY(0)',
      },
    },
  },
  cinput : $(comm, {
    borderColor: "#d9d9d9",
    '&:hover' : {
      borderColor : '#40a9ff',
    },
    '&:focus' : {
      borderColor : '#40a9ff',
      boxShadow : '0 0 0 2px rgba(24,144,255,.2)',
    },
  }),
  cinput_error : $(comm, {
    borderColor: "#f5222d",
    '&:focus' : {
      borderColor : '#ff4d4f',
      boxShadow : '0 0 0 2px rgba(245,34,45,.2)',
    },
  }),
  cmsg : {
    color : '#f5222d',
    fontSize : 13,
    fontWeight : 'normal',
    padding : '2px 0',
    animation : 'validationTipIn 0.3s',
  },
})
class Test extends PureComponent {
  render() {
    const {classes:{cinput, cinput_error, cmsg}} = this.props
    return <div>
      <Input icon='people' className={cinput} placeholder='Username' />
      <Gap />
      <Input icon='newshot' className={cinput_error} placeholder='Password' />
      <div className={cmsg}>请输入正确的信息</div>
    </div>
  }
}
render(<Test /> , document.getElementById('root'))

