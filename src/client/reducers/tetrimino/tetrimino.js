import {TETRI_ACTION, TETRI_STEP, TETRI_RESET} from '../../actions/tetrimino'
import {reducerTetriAction, reducerTetriStep} from "./functions";
import {PIECES_INFO} from "../../../common/pieces";

const initialState = {
  items: [],
  pieceInfo: null,
  pieceStep: 0,
  collision:false,
  coords: {
    prevPosX: null,
    prevPosY: null,
    posX:0,
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
    case TETRI_RESET: {
      return initialState
    }
    default:
      return {
        ...state,
        pieceInfo: PIECES_INFO[5][state.rotate]
      }
  }
}