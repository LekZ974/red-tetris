import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'
import user from './user/user'
import games from './games/games'
import game from './game/game'
import tetrimino from './tetrimino/tetrimino'
import { TETRI_ACTION, TETRI_POS_IS_NOT_VALID } from '../actions/tetrimino';
import * as TetriService from "../services/TetriService";
import {store} from "../index";

const appReducer = combineReducers({
  user,
  games,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  let pos;
  state && state.tetrimino && state.tetrimino.coords ? pos = { X: state.tetrimino.coords.posX, Y: state.tetrimino.coords.posY } : null;
  switch (action.type) {
    case TETRI_ACTION : {
      switch (action.action){
        case 'Space': {
          const newPos = TetriService.finalPos(state.user.grid, state.tetrimino.pieceInfo.piece, pos)
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
    case TETRI_POS_IS_NOT_VALID : {
      const newPos = TetriService.updatePos(state.user.grid, state.tetrimino.pieceInfo.piece, pos)
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
    default: {
      return appReducer(state, action)
    }
  }
}

export default rootReducer
