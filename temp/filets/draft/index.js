/* eslint-disable react/jsx-pascal-case */
import React from 'react';
import { render } from 'react-dom'
import { createStore, combineReducers} from 'redux'
import { Provider } from 'react-redux'

import App_ from './App.js'

// brush的reducer
function brush(s = null, a) {
  switch(a.type) {
    case 'brush_set':
      return a.val
    case 'brush_clear':
      console.log("clear!")
      return null
    default:
      return s
  }
}

let store = createStore(combineReducers({
  brush,
}))

render(<Provider store={store} >
    <App_ />
  </Provider>, 
  document.getElementById('root'))

