import React, { PureComponent} from 'react'
import {render} from 'react-dom'
import _ from 'lodash'
import injectSheet from 'react-jss'

const comm = {
  padding: "4px 11px",
  color: "rgba(0, 0, 0, 0.65)",
  borderRadius: "4px",
  borderStyle : 'solid',
  borderWidth : 1,
  transition: ".3s",
  '&:focus' : {
    outline : 'none',
  },
}
const $ = (...p)=>_.merge({}, comm, ...p)

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
      <h1>
        <input className={cinput} />
      </h1>
      <h1>
        <input className={cinput_error} />
        <div className={cmsg}>请输入正确的信息</div>
      </h1>
    </div>
  }
}
render(<Test /> , document.getElementById('root'))

