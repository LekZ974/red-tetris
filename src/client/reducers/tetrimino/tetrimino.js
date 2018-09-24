import {TETRI_ACTION, TETRI_STEP} from '../../actions/tetrimino'
import {reducerTetriAction, reducerTetriStep} from "./functions";

const initialState = {
  items: [],
  pieceId: 0,
  pieceStep: 0,
  coords: {
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
    default:
      return state
  }
}
