import {TETRI_ACTION, TETRI_STEP} from '../actions/tetrimino'

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
          pieceStep: state.pieceStep + 1,
          coords:{
            ...state.coords,
            posY: state.coords.posY + 1
          }
        }
      }
    }
    case TETRI_ACTION: {
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
