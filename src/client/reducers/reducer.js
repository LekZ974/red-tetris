import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import user from './user/user'
import games from './games/games'
import game from './game/game'
import tetrimino from './tetrimino/tetrimino'

const appReducer = combineReducers({
  user,
  games,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  switch (action.type) {
    default: {
      return appReducer(state, action)
    }
  }
}

export default rootReducer
