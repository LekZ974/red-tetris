import { GAME_START, GAME_PAUSE, GAME_STOP, GAME_ERROR } from '../actions/playground'

const initialState = {
  start: false,
  stop: false,
}

export default function PlaygroundReducer(state = initialState, action = {}) {
  const newState = Object.assign({}, state)
  console.log('HELLO', state)
  switch (action.type) {
  case GAME_START: {
    newState.start = true
    console.log('newsState playground', newState)
    return {
      ...newState,
      payload: action,
    }

  }
  case GAME_PAUSE: {
    newState.start = false
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
