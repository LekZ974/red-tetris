import {UPDATE_PLAYERS, EMIT_CREATE_GAME, RCV_CREATE_GAME, RCV_GAME_STATUS} from '../../actions/game'
import {reducerEmitGameStatus, reducerRcvCreateGame} from './functions'

export const initialState = {
  items: [],
  name: '',
  id: '',
  owner: '',
  gameIsStarted: false,
  start: false,
  pause: false,
  players: null,
  params: {
    addMalus: true,
  },
  isLoading: false,
}

export default function GameReducer (state = initialState, action = {}) {
  if (!action.payload) {
    action.payload = []
  }
  switch (action.type) {
    case UPDATE_PLAYERS: {
      console.log(action)
      return {
        ...state,
        players: action.data,
      }
    }
    case RCV_GAME_STATUS: {
      return reducerEmitGameStatus(state, action, initialState)
    }
    case EMIT_CREATE_GAME: {
      return {
        ...state,
        name: action.gameName,
        isLoading: true,
      }
    }
    case RCV_CREATE_GAME: {
      return reducerRcvCreateGame(state, action, initialState)
    }
    default:
      return state
  }
}
