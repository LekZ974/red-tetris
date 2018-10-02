import {EMIT_GAME_STATUS, GAME_FLOW, EMIT_GAME_PIECES} from '../../actions/game'
import {reducerEmitGameStatus, reducerEmitGamePieces, reducerGameFlow} from './functions'

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
      return reducerEmitGameStatus(state, action, initialState)
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
