import {TETRI_POS, TETRI_ACTION, TETRI_STEP, TETRI_INIT, TETRI_NEW, TETRI_IS_BLOCK} from '../../actions/tetrimino'
import {reducerTetriAction, reducerTetriStep} from "./functions";
import {PIECES_INFO} from "../../../common/pieces";

const initialState = {
  items: [],
  id: null,
  pieceInfo: null,
  pieceStep: 0,
  needNext:false,
  coords: {
    posX:4,
    posY:0
  },
  action: null,
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
      return {
        ...state,
        needNext: false,
      }
    }
    case TETRI_NEW: {
      return {
        ...initialState,
        id: action.tetrimino.id,
        rotate: action.tetrimino.rotate,
        pieceInfo: PIECES_INFO[action.tetrimino.id - 1][action.tetrimino.rotate],
        coords: {
          posX: initialState.coords.posX + PIECES_INFO[action.tetrimino.id - 1][action.tetrimino.rotate].info.posX,
          posY: initialState.coords.posY + PIECES_INFO[action.tetrimino.id - 1][action.tetrimino.rotate].info.posY,
        }
      }
    }
    default:
      return {
        ...state,
      }
  }
}
