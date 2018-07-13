import { TETRIMINOS_MOVE_DOWN, TETRIMINOS_MOVE_LEFT, TETRIMINOS_MOVE_RIGHT, TETRIMINOS_MOVE_UP } from '../actions/tetriminos'

const initialState = {
  payload: {}
}

export default function TetriminosReducer (state = initialState, action = {}) {
  switch (action.type) {
    case TETRIMINOS_MOVE_DOWN: {
      console.log(action)
      return {
          ...state,
          payload: action,
        }
      }
    case TETRIMINOS_MOVE_LEFT: {
      console.log(action)
      return {
        ...state,
        payload: action,
      }
    }
    case TETRIMINOS_MOVE_RIGHT: {
      console.log(action)
      return {
        ...state,
        payload: action,
      }
    }
    case TETRIMINOS_MOVE_UP: {
      console.log(action)
      return {
        ...state,
        payload: action,
      }
    }
    default:
      return state
  }
}

