import { PIECES_ACTION, PIECES_INFO } from '../../../common/pieces';
import * as TetriService from "../../services/TetriService";
import { initialState } from './tetrimino';
import {KEYBOARD_ACTION} from '../../../common/const';

const reducerTetriStep = (state, action, initialState) => {
  if (state.pieceInfo) {
    const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.MOVE_DOWN)
    return {
      ...newTetriminoState,
      pieceStep: state.pieceStep + 1,
    }
  }
  return initialState
}

const reducerTetriAction = (state, action) => {
  let pieceAction;
  switch (action.action) {
    case KEYBOARD_ACTION.space: {
      pieceAction = PIECES_ACTION.MOVE_DROP
      break;
    }
    case KEYBOARD_ACTION.left : {
      pieceAction = PIECES_ACTION.MOVE_LEFT
      break;
    }
    case KEYBOARD_ACTION.right : {
      pieceAction = PIECES_ACTION.MOVE_RIGHT
      break;
    }
    case KEYBOARD_ACTION.down : {
      pieceAction = PIECES_ACTION.MOVE_DOWN
      break;
    }
    case KEYBOARD_ACTION.up : {
      pieceAction = PIECES_ACTION.ROTATE_RIGHT
      break;
    }
    default: {
      pieceAction = null
      break;
    }
  }
  return pieceAction && state.pieceInfo ? TetriService.updateTetriPos(action.user.grid, state, pieceAction) : {...state}
}

const reducerTetriInit = (state) => {
  return {
    ...state,
    needNext: false,
  }
}

const reducerTetriNew = (action) => {
  return {
    ...initialState,
    id: action.tetrimino.id,
    rotate: action.tetrimino.rotate,
    pieceInfo: PIECES_INFO[action.tetrimino.id - 1][action.tetrimino.rotate],
    coords: {
      posX: initialState.coords.posX + PIECES_INFO[action.tetrimino.id - 1][action.tetrimino.rotate].info.posX,
      posY: initialState.coords.posY + PIECES_INFO[action.tetrimino.id - 1][action.tetrimino.rotate].info.posY,
    },
  }
}

export {
  reducerTetriStep,
  reducerTetriAction,
  reducerTetriInit,
  reducerTetriNew,
}
