/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { render } from 'react-dom'
import { createStore, 
  // combineReducers,
} from 'redux'
import { Provider } from 'react-redux'
import {Map as IMap} from 'immutable'

import App_ from './App.js'

let s0 = IMap({
  brush : null,
})

function reducer(s = s0, a) {
  switch(a.type) {
    case 'brush_set':
      return s.set('brush', a.val)
    case 'brush_clear':
      console.log("clear!")
      return s.set('brush', null)
    default:
      return s
  }
}

let store = createStore(reducer)

render(<Provider store={store} >
    <App_ />
  </Provider>, 
  document.getElementById('root'))

