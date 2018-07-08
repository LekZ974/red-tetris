import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import user from './user'
import rooms from './rooms'

const appReducer = combineReducers({
  user,
  rooms,
  alert,
  form: formReducer
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer
