import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {w, border} from './utils/cssobj.js'

class Property extends PureComponent {

  render() {
    console.log("property render")
    return <div style={{ ...w(150), ...border}} >
    </div>
  }
}

const sm = (s) => {
  return {
    type: 'xx',
  }
}

const dm = (d) => {
  return {
    // some_action(){
    //   // d({ type: 'some_action', })
    // },
  }
}

export default connect(sm, dm)(Property)

