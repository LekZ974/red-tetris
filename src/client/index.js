import React from 'react'
import ReactDom from 'react-dom'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux'
import storeStateMiddleWare from './middleware/storeStateMiddleWare'
import socketMiddleWare from './middleware/socketMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import { createBrowserHistory } from 'history'
import {withRouter} from 'react-router-dom'
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router'
import params from "../../params"
import io from 'socket.io-client'
import {eventHandler} from "./utils/eventHandler";
import {ticking} from "./utils/tickingHandler";

const initialState = {}

const socket = io.connect(params.server.url);

const history = createBrowserHistory()

const middlewares = [thunk, storeStateMiddleWare, routerMiddleware(history), socketMiddleWare(socket)]

const enhancedReducer = connectRouter(history)(reducer)

const composeFn =
  composeWithDevTools // a modifier si va en production

const store = composeFn(applyMiddleware(...middlewares))(createStore)(enhancedReducer)

export { store, history }

const NonBlockApp = withRouter(App)

ReactDom.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <NonBlockApp/>
    </ConnectedRouter>
  </Provider>
), document.getElementById('tetris'))

window.addEventListener('keydown', e => eventHandler(e), false);
ticking();
