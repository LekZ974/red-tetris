import {TETRI_POS, TETRI_ACTION, TETRI_STEP, TETRI_INIT, TETRI_NEW, TETRI_INIT_STATE} from '../../actions/tetrimino'
import {reducerTetriAction, reducerTetriStep, reducerTetriInit, reducerTetriNew} from "./functions";

export const initialState = {
  items: [],
  id: null,
  pieceInfo: null,
  pieceStep: 0,
  needNext:false,
  coords: {
    posX:4,
    posY:0
  },
  rotate:0,
}

export default function TetriminoReducer (state = initialState, action = {}) {
  switch (action.type) {
    case TETRI_STEP: {
      return reducerTetriStep(state, action, initialState)
    }
    case TETRI_ACTION: {
      return reducerTetriAction(state, action)
    }
    case TETRI_INIT: {
      return reducerTetriInit(state);
    }
    case TETRI_NEW: {
      return reducerTetriNew(action);
    }
    case TETRI_INIT_STATE: {
      return initialState
    }

    default:
      return {
        ...state,
      }
  }
}
