import React from 'react'
import ReactDom from 'react-dom'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import { Provider } from 'react-redux'
import storeStateMiddleWare from './middleware/storeStateMiddleWare'
import reducer from './reducers'
import App from './containers/app'
import { createBrowserHistory } from 'history'
import {withRouter} from 'react-router'
import { ConnectedRouter, routerMiddleware, connectRouter } from 'connected-react-router'
import { persistStore, persistReducer } from 'redux-persist'
import {alert} from './actions/alert'
import storage from "redux-persist/lib/storage";

const initialState = {}

const history = createBrowserHistory()

const middlewares = [thunk, storeStateMiddleWare, routerMiddleware(history)]

const persistConfig = {
  key: 'root',
  storage
}

const enhancedReducer = connectRouter(history)(persistReducer(persistConfig, reducer))

const composeFn =
  composeWithDevTools // a modifier si va en production

const store = composeFn(applyMiddleware(...middlewares))(createStore)(enhancedReducer)

const persistor = persistStore(store)

export { store, persistor, history }

const NonBlockApp = withRouter(App)

ReactDom.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <NonBlockApp/>
    </ConnectedRouter>
  </Provider>
), document.getElementById('tetris'))

store.dispatch(alert('Soon, will be here a fantastic Tetris ...'))
