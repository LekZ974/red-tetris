import {TETRI_STEP} from '../actions/tetrimino'

let step = 0

const initialState = {
  items: [],
  step: step
}

export default function TetriminoReducer (state = initialState, action = {}) {
  switch (action.type) {
    case TETRI_STEP: {
      step += 1;
      console.log('TETRI',action.type, step)
      return {
        ...state,
        items: action.payload,
        step: step
      }
    }
    default:
      return state
  }
}
