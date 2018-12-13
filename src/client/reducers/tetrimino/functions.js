import {PIECES_ACTION} from "../../../common/pieces";
import * as TetriService from "../../services/TetriService";
import {store} from "../../index";
import * as SocketService from "../../services/SocketService";

const reducerTetriStep = (state, action, initialState) => {
  if (state.pieceInfo) {
    const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.MOVE_DOWN)
    if (newTetriminoState.needNext) {
      SocketService.emitUpdateGrid(TetriService.placePiece(action.user.grid, newTetriminoState))
      SocketService.emitNeedPieces()
    }
    return {
      ...newTetriminoState,
      pieceStep: state.pieceStep + 1,
      needNext: false,
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
