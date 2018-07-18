import { GAME_START, GAME_PAUSE, GAME_STOP, GAME_ERROR } from '../actions/playground'

const initialState = {
  start: false,
  stop: false,
}

export default function PlaygroundReducer(state = initialState, action = {}) {
  const newState = Object.assign({}, state)

  switch (action.type) {
  case GAME_START: {
    newState.start = true
    return {
      ...newState,
      payload: action,
    }

  }
  case GAME_PAUSE: {
    newState.start = false
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
