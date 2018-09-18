import {EMIT_GAME_STATUS, GAME_FLOW, EMIT_GAME_PIECES} from '../actions/game'

const initialState = {
  items: [],
  gameIsStarted: false,
  start: false,
  pause: false,
  gamePieces: []
}

export default function GameReducer (state = initialState, action = {}) {
  if (!action.payload) {
    action.payload = [];
  }
  switch (action.type) {
    case EMIT_GAME_STATUS: {
      switch (action.gameStatus) {
        case 'Start': {
          return {
            ...state,
            items: action.payload,
            start: true,
            gameIsStarted: true,
            pause: false
          }
        }
        case 'Pause': {
          return {
            ...state,
            items: action.payload,
            start: false,
            pause: true,
            gameIsStarted: true,
          }
        }
        case 'Stop': {
          return initialState
        }
        default: return state
      }
    }
    case EMIT_GAME_PIECES: {
      return state
    }
    case GAME_FLOW: {
      return state
    }
    default:
      return state
  }
}
