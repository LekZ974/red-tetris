import {
  TETRIMINOS_MOVE_DOWN, TETRIMINOS_MOVE_LEFT, TETRIMINOS_MOVE_RIGHT, TETRIMINOS_MOVE_UP,
  TETRIMINOS_TICK, RESET, GAME_ERROR, GAME_PAUSE, GAME_START, GAME_STOP
} from '../actions/tetriminos'
import {windowTick} from "../components/Room/PlayGround";




const initialState = {
  tetriminosPosX: 0,
  tetriminosPosY: -480,
  rot: 0,
  start: false,
  stop: false,
}

const resetState = {
  tetriminosPosX: 0,
  tetriminosPosY: -480,
  rot: 0,
}

export default function TetriminosReducer(state = initialState, action = {}) {
  console.log('dans reducer', state)
  const newState = Object.assign({}, state)

  switch (action.type) {
  case TETRIMINOS_TICK:{
    if(newState.start === true){
      newState.tetriminosPosY = newState.tetriminosPosY + 48
    }
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_DOWN: {
    console.log(action)
    if(newState.start === true) {
      newState.tetriminosPosY = newState.tetriminosPosY + 48
    }
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_LEFT: {
    console.log(action)
    if(newState.start === true) {
      newState.tetriminosPosX = newState.tetriminosPosX - 48
    }
    return {
      ...newState,
      payload: action,
    }
  }
  case TETRIMINOS_MOVE_RIGHT: {
    if(newState.start === true) {
      newState.tetriminosPosX = newState.tetriminosPosX + 48
    }
    return {
      ...newState,
      payload: action,
    }
  }
    case RESET:{
     const newResetState = resetState
      return {
        ...newResetState,
        payload: action,
      }
    }
  case TETRIMINOS_MOVE_UP: {
    if(newState.start === true) {
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
    }
      return {
        ...newState,
        payload: action,
      }
    }
  case GAME_START: {
    newState.start = false
    console.log('newsState playground', newState)
    return {
      ...newState,
      payload: action,
    }

    }
  case GAME_PAUSE: {
    newState.start = true
    console.log('newsState playground pause', newState)
    return {
      ...newState,
      payload: action,
    }
    }
  case GAME_STOP: {
    newState.stop = true
    return {
      ...newState,
      payload: action,
    }

  }
  default:
    return state
  }
}

