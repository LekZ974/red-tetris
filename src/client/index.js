import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux'
import {storeStateMiddleWare} from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import {alert} from './actions/alert'

const initialState = {}

const middlewares = [thunk, storeStateMiddleWare]

const composeFn =
  composeWithDevTools // a modifier si va en production

const store = composeFn(applyMiddleware(...middlewares))(createStore)(reducer)

ReactDom.render((
  <Provider store={store}>
    <App/>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
