import {EMIT_GAME_STATUS, GAME_FLOW, EMIT_GAME_PIECES, EMIT_CREATE_GAME} from '../../actions/game'
import {reducerEmitCreateGame, reducerEmitGameStatus, reducerEmitGamePieces, reducerGameFlow} from './functions'

const initialState = {
  items: [],
  name: '',
  id: '',
  owner: '',
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
      return reducerEmitGameStatus(state, action, initialState)
    }
    case EMIT_CREATE_GAME: {
      return reducerEmitCreateGame(state, action, initialState)
    }
    case EMIT_GAME_PIECES: {
      return reducerEmitGamePieces(state, action)
    }
    case GAME_FLOW: {
      return reducerGameFlow(state, action)
    }
    default:
      return state
  }
}
