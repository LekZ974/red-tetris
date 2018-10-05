import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import user from './user'
import tetriminos from './tetriminos'
import games from './games'

const appReducer = combineReducers({
  user,
  games,
  alert,
  tetriminos,
  form: formReducer
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer
