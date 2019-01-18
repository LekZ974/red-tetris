import {
  UPDATE_PLAYERS,
  EMIT_CREATE_GAME,
  RCV_CREATE_GAME,
  RCV_GAME_STATUS,
  RCV_GAME_IS_FINISHED,
  RCV_GAME_CAN_RESTART,
  GAME_INIT_STATE,
  GAME_INIT,
  GAME_UPDATE,
  GAME_SOUND
} from '../../actions/game'
import {
  reducerEmitGameStatus,
  reducerRcvCreateGame,
  reducerGameUpdate,
  reducerRcvGameCanRestart,
  reducerGameSound,
  reducerGameInit,
  reducerEmitCreateGame,
  reducerGameIsFinished,
} from './functions'

import { GAME_MODE, SPEED_MODE, MALUS_MODE } from '../../../common/const';

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
    gameMode: GAME_MODE.multi,
    sound: true,
    addMalus: MALUS_MODE.malus,
    speed: SPEED_MODE.easy,
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
      return reducerEmitCreateGame(state, action);
    }
    case RCV_CREATE_GAME: {
      return reducerRcvCreateGame(state, action, initialState)
    }
    case RCV_GAME_IS_FINISHED: {
      return reducerGameIsFinished(state);
    }
    case RCV_GAME_CAN_RESTART: {
      return reducerRcvGameCanRestart(state);
    }
    case GAME_INIT_STATE: {
      return initialState
    }
    case GAME_INIT: {
      return reducerGameInit(state);
    }
    case GAME_UPDATE : {
      return reducerGameUpdate(state, action);
    }
    case GAME_SOUND : {
      return reducerGameSound(state);
    }
    default:
      return state
  }
}
