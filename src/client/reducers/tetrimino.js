import {TETRI_STEP} from '../actions/tetrimino'

const initialState = {
  items: [],
  pieceId: 0,
  pieceStep: 0,
}

export default function TetriminoReducer (state = initialState, action = {}) {
  console.log('TETRI REDUCER',action)
  if (!action.payload) {
    action.payload = []
  }
  switch (action.type) {
    case TETRI_STEP: {
      if (!action.game.gameIsStarted) {
        return initialState
      } else {
        return {
          ...state,
          items: action.payload,
          pieceStep: state.pieceStep + 1
        }
      }
    }
    default:
      return state
  }
}
