import React, { PureComponent } from 'react';
import { connect } from 'react-redux'
import {w, border, bg} from './utils/cssobj.js'
import models from './kit_type.js'
import _ from 'lodash'
import Div from './components/Div.js'

class Property extends PureComponent {

  render() {
    const p = this.props
    console.log("property render")
    return <div style={{ ...w(150), ...border}} >
      <Div style={{...bg('orange')}} >
        {p.model}
      </Div>
      {_.map(p.inputs, (type, name ) => {
        return <div key={name}>
          <div>
            {name}
          </div>
          <div>
            <input ref={name} style={{...w('80%')}} />
          </div>
        </div>
      })}
    </div>
  }
}

const sm = (s) => {

  const model = (()=>{
    if ( s.get('selected_type') !== 'kit' ) {
      return null
    } 
    return s.get('kits').get(s.get('selected')).type
  })()

  return {
    model,

    inputs: model ? models[model].in : null,
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

