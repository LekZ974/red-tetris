import {
  UPDATE_PLAYERS,
  EMIT_CREATE_GAME,
  RCV_CREATE_GAME,
  RCV_GAME_STATUS,
  RCV_GAME_IS_FINISHED,
  RCV_GAME_CAN_RESTART,
  GAME_INIT_STATE,
  GAME_INIT, GAME_UPDATE, GAME_SOUND
} from '../../actions/game'
import {reducerEmitGameStatus, reducerRcvCreateGame} from './functions'
import {USER_UPDATE} from "../../actions/user";

export const initialState = {
  items: [],
  name: '',
  id: '',
  owner: '',
  gameIsStarted: false,
  start: false,
  pause: false,
  players: null,
  round: 0,
  params: {
    gameMode: 'MULTI',
    sound: true,
  },
  isLoading: false,
}

export default function GameReducer (state = initialState, action = {}) {
  if (!action.payload) {
    action.payload = []
  }
  switch (action.type) {
    case UPDATE_PLAYERS: {
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
    case RCV_GAME_IS_FINISHED: {
      return {
        ...state,
        gameIsStarted: false,
        start: false,
        params: {
          ...state.params,
        },
        isLoading: false,
      }
    }
    case RCV_GAME_CAN_RESTART: {
      return {
        ...state,
        gameIsStarted: false,
        round: state.round + 1,
      }
    }
    case GAME_INIT_STATE: {
      return initialState
    }
    case GAME_INIT: {
      return {
        ...state,
        owner: '',
        gameIsStarted: false,
        start: false,
        pause: false,
        params: {
          ...state.params,
        },
        isLoading: false,
      }
    }
    case GAME_UPDATE : {
      return {
        ...state,
        ...action.data,
      }
    }
    case GAME_SOUND : {
      return {
        ...state,
        params: {
          ...state.params,
          sound: !state.params.sound,
        }
      }
    }
    default:
      return state
  }
}
