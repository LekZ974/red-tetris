import { TETRIMINOS_MOVE_DOWN, TETRIMINOS_MOVE_LEFT, TETRIMINOS_MOVE_RIGHT, TETRIMINOS_MOVE_UP } from '../actions/tetriminos'

const initialState = {
  tetriminosPosX: 0,
  tetriminosPosY: -480,
  rot: 0,
  payload: {},
}

export default function TetriminosReducer(state = initialState, action = {}) {
  console.log('dans reducer', state)
  const newState = Object.assign({}, state)
  console.log('newstate', newState)
  switch (action.type) {
  case TETRIMINOS_MOVE_DOWN: {
    console.log(action)
    newState.tetriminosPosY = newState.tetriminosPosY + 48
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_LEFT: {
    console.log(action)
    newState.tetriminosPosX = newState.tetriminosPosX - 48
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_RIGHT: {
    newState.tetriminosPosX = newState.tetriminosPosX + 48
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_UP: {
    switch (newState.rot) {
    case 0:
      newState.rot = 90
      break
    case 90:
      newState.rot = 180
      break
    case 180:
      newState.rot = 360
      break
    case 360:
      newState.rot = 0
      break
    default:
      newState.rot = 0
      break
    }
    console.log(action)

    return {
      ...newState,
      payload: action,
    }
  }
  default:
    return state
  }
}

