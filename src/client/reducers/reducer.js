import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import alert from './alert'
import user from './user/user'
import games from './games/games'
import game from './game/game'
import tetrimino from './tetrimino/tetrimino'
import {EMIT_GAME_STATUS} from "../actions/game";
import { GAME_STATUS } from '../../common/const';

const appReducer = combineReducers({
  alert,
  user,
  games,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case EMIT_GAME_STATUS: {
      if (GAME_STATUS.stop === action.gameStatus) {
        return appReducer(undefined, action)
      }
    }
    default: {
      return appReducer(state, action)
    }
  }
}

export default rootReducer
