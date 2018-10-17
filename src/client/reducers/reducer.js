import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {PIECES_ACTION} from '../../common/pieces'
import alert from './alert'
import user from './user/user'
import games from './games/games'
import game from './game/game'
import tetrimino from './tetrimino/tetrimino'
import { TETRI_ACTION, TETRI_POS_IS_NOT_VALID } from '../actions/tetrimino';
import * as TetriService from "../services/TetriService";

const appReducer = combineReducers({
  user,
  games,
  game,
  tetrimino,
  form: formReducer
})

const rootReducer = (state, action) => {
  switch (action.type) {
    case TETRI_ACTION : {
      switch (action.action){
        case 'Space': {
          const newPos = TetriService.finalPos(state.user.grid, state.tetrimino.pieceInfo.piece, state.tetrimino.coords)
          return appReducer(
            {
              ...state,
              tetrimino: {
                ...state.tetrimino,
                coords: {
                  posX: newPos.posX,
                  posY: newPos.posY
                }
              }
            },
            action
          )
        }
        case 'ArrowLeft' : {
          const newTetriminoState = TetriService.updateTetriPos(state.user.grid, state.tetrimino, PIECES_ACTION.MOVE_LEFT)
          return appReducer({
            ...state,
            tetrimino: newTetriminoState,
          }, action)
        }
        case 'ArrowRight' : {
          const newTetriminoState = TetriService.updateTetriPos(state.user.grid, state.tetrimino, PIECES_ACTION.MOVE_RIGHT)
          return appReducer({
            ...state,
            tetrimino: newTetriminoState,
          }, action)
        }
        case 'ArrowDown' : {
          const newTetriminoState = TetriService.updateTetriPos(state.user.grid, state.tetrimino, PIECES_ACTION.MOVE_DOWN)
          return appReducer({
            ...state,
            tetrimino: newTetriminoState,
          }, action)
        }
        case 'ArrowUp' : {
          const newTetriminoState = TetriService.updateTetriPos(state.user.grid, state.tetrimino, PIECES_ACTION.ROTATE_LEFT)
          return appReducer({
            ...state,
            tetrimino: newTetriminoState,
          }, action)
        }
        default: {
          return appReducer(state, action)
        }
      }
    }
    case TETRI_POS_IS_NOT_VALID : {
      const newPos = TetriService.updatePos(state.user.grid, state.tetrimino.pieceInfo.piece, pos)
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
