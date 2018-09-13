import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import user from './user'
import games from './games'
import game from './game'
import tetrimino from './tetrimino'

const appReducer = combineReducers({
  user,
  games,
  alert,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  return appReducer(state, action)
}

export default rootReducer
