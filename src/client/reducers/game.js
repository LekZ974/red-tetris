import {GAME_STATUS, GAME_FLOW} from '../actions/game'

const initialState = {
  items: [],
  gameIsStarted: false,
  start: false,
  stop: false
}

export default function GameReducer (state = initialState, action = {}) {
  switch (action.type) {
    case GAME_STATUS: {
      switch (action.gameStatus) {
        case 'Start': {
          return {
            ...state,
            items: action.payload,
            start: true,
            gameIsStarted: true,
            stop: false
          }
        }
        case 'Pause': {
          return {
            ...state,
            items: action.payload,
            start: false
          }
        }
        case 'Stop': {
          return {
            ...state,
            items: action.payload,
            gameIsStarted: false,
            stop: true,
            start:false
          }
        }
        default: return state
      }
    }
    case GAME_FLOW: {
      return {...state}
    }
    default:
      return state
  }
}
