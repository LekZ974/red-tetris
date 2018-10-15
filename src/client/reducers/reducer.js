import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import user from './user/user'
import games from './games/games'
import game from './game/game'
import tetrimino from './tetrimino/tetrimino'
import {TETRI_ACTION} from "../actions/tetrimino";
import * as TetriService from "../services/TetriService";
import {store} from "../index";

const appReducer = combineReducers({
  user,
  games,
  alert,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case TETRI_ACTION : {
      switch (action.action){
        case 'Space': {
          console.log(state)
          const newPos = TetriService.updatePos(state.user.grid, state.tetrimino.pieceInfo.piece, state.tetrimino.coords, state.tetrimino.action)
          console.log("NEWPOS", newPos)
          return appReducer(
            {
              ...state,
              tetrimino: {
                ...state.tetrimino,
                coords: {
                  posX: newPos.X,
                  posY: newPos.Y
                }
              }
            },
            action
          )
        }
      }
    }
  }
  return appReducer(state, action)
}

export default rootReducer
