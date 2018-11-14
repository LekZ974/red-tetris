import {UPDATE_GAME_STATUS, GAME_FLOW, CREATE_GAME, NEED_NEW_PIECES} from '../../actions/game'
import {reducerEmitCreateGame, reducerEmitGameStatus, reducerEmitGamePieces, reducerGameFlow} from './functions'

export const initialState = {
  items: [],
  name: '',
  id: '',
  owner: '',
  gameIsStarted: false,
  start: false,
  pause: false,
  params: {
    addMalus: true,
  }
}

export default function GameReducer (state = initialState, action = {}) {
  if (!action.payload) {
    action.payload = [];
  }
  switch (action.type) {
    case UPDATE_GAME_STATUS: {
      return reducerEmitGameStatus(state, action, initialState)
    }
    case CREATE_GAME: {
      return reducerEmitCreateGame(state, action, initialState)
    }
    case NEED_NEW_PIECES: {
      return reducerEmitGamePieces(state, action)
    }
    default:
      return state
  }
}
