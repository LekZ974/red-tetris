import {TETRI_POS, TETRI_ACTION, TETRI_STEP, TETRI_INIT, TETRI_NEW, TETRI_IS_BLOCK} from '../../actions/tetrimino'
import {reducerTetriAction, reducerTetriStep} from "./functions";
import {PIECES_INFO} from "../../../common/pieces";

const initialState = {
  items: [],
  id: null,
  pieceInfo: null,
  pieceStep: 0,
  collision:false,
  coords: {
    posX:0,
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
      return initialState
    }
    case TETRI_NEW: {
      console.log("TETRI ACTION", action)
      return {
        ...state,
        id: action.tetrimino.id,
        rotate: action.tetrimino.rotate,
        pieceInfo: PIECES_INFO[action.tetrimino.id][action.tetrimino.rotate]
      }
    }
    case TETRI_IS_BLOCK: {
      return {
        ...state,
        collision: true
      };
    }
    default:
      return {
        ...state,
      }
  }
}
