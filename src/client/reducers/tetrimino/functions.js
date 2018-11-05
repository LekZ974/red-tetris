import {PIECES_ACTION} from "../../../common/pieces";
import * as TetriService from "../../services/TetriService";

const reducerTetriStep = (state, action, initialState) => {
  if (0 === state.pieceStep) {
    state.coords.posY = -1
  }
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
  switch (action.action) {
    case 'Space': {
      const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.MOVE_DROP)
      return newTetriminoState;
    }
    case 'ArrowLeft' : {
      const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.MOVE_LEFT)
      return newTetriminoState;
    }
    case 'ArrowRight' : {
      const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.MOVE_RIGHT)
      return newTetriminoState;

    }
    case 'ArrowDown' : {
      const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.MOVE_DOWN)
      return newTetriminoState;

    }
    case 'ArrowUp' : {
      const newTetriminoState = TetriService.updateTetriPos(action.user.grid, state, PIECES_ACTION.ROTATE_LEFT)
      return newTetriminoState;
    }
    default: {
      return state
    }
  }
}

export {
  reducerTetriStep,
  reducerTetriAction,
}
