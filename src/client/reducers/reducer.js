import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import user from './user'
import rooms from './rooms'
import tetriminos from './tetriminos'
import playground from './playground'

const appReducer = combineReducers({
  user,
  rooms,
  alert,
  tetriminos,
  playground,
  form: formReducer
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer
