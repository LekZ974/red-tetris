import {PIECES_ACTION} from "../../../common/pieces";
import * as TetriService from "../../services/TetriService";

const reducerTetriStep = (state, action, initialState) => {
  // if (0 === state.pieceStep) {
  //   state.coords.posY = -1
  // }
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
    case 'Space': {
      pieceAction = PIECES_ACTION.MOVE_DROP
      break;
    }
    case 'ArrowLeft' : {
      pieceAction = PIECES_ACTION.MOVE_LEFT
      break;
    }
    case 'ArrowRight' : {
      pieceAction = PIECES_ACTION.MOVE_RIGHT
      break;
    }
    case 'ArrowDown' : {
      pieceAction = PIECES_ACTION.MOVE_DOWN
      break;
    }
    case 'ArrowUp' : {
      pieceAction = PIECES_ACTION.ROTATE_RIGHT
      break;
    }
    default: {
      pieceAction = null
      break;
    }
  }
  return pieceAction ? TetriService.updateTetriPos(action.user.grid, state, pieceAction) : state
}

export {
  reducerTetriStep,
  reducerTetriAction,
}
