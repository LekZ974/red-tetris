import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import user from './user/user'
import games from './games/games'
import game from './game/game'
import tetrimino from './tetrimino/tetrimino'
import {UPDATE_GAME_STATUS} from "../actions/game";

const appReducer = combineReducers({
  user,
  games,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GAME_STATUS: {
      if ('Stop' === action.gameStatus) {
        return appReducer(undefined, action)
      }
    }
    default: {
      return appReducer(state, action)
    }
  }
}

export default rootReducer
