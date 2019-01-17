import {
  USER_INIT,
  EMIT_USER_LOGIN,
  RCV_USER_LOGIN,
  USER_CONNECT,
  USER_UPDATE_GRID,
  USER_UPDATE,
  EMIT_USER_JOIN_GAME,
  RCV_USER_JOIN_GAME,
  EMIT_USER_LEAVE_GAME,
  USER_INIT_STATE,
  EMIT_USER_LOST,
  EMIT_USER_WIN,
  USER_ADD_MALUS,
} from '../../actions/user'
import {
  reducerEmitUserJoinGame,
  reducerEmitUserLeaveGame,
  reducerEmitUserLogin,
  reducerEmitUserLost,
  reducerEmitUserWin,
  reducerRcvUserJoinGame,
  reducerRcvUserLogin,
  reducerUserAddMalus,
  reducerUserConnect,
  reducerUserInit,
  reducerUserUpdate,
  reducerUserUpdateGrid,
} from "./functions";
import {USER_ROLE} from '../../../common/const';

export const initialState = {
  id: '',
  name: '',
  gameName: '',
  role: USER_ROLE.master,
  connected: false,
  grid: [],
  completeLine: 0,
  malus: 0,
  count: 0,
  speedDelay: 500,
  level: 0,
  score: 0,
  payload: {},
  lost: false,
  winner: false,
  isLoading: false,
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
    case USER_CONNECT : {
      return reducerUserConnect(state);
    }
    case EMIT_USER_LOGIN: {
      return reducerEmitUserLogin(state);
    }
    case RCV_USER_LOGIN: {
      return reducerRcvUserLogin(state);
    }
    case EMIT_USER_JOIN_GAME: {
      return reducerEmitUserJoinGame(state, action);
    }
    case RCV_USER_JOIN_GAME: {
      return reducerRcvUserJoinGame(state);
    }
    case EMIT_USER_LEAVE_GAME: {
      return reducerEmitUserLeaveGame(state);
    }
    case USER_INIT_STATE: {
      return initialState
    }
    case USER_UPDATE : {
      return reducerUserUpdate(state, action);
    }
    case USER_INIT: {
      return reducerUserInit(state);
    }
    case USER_UPDATE_GRID: {
      return reducerUserUpdateGrid(action, state);
    }
    case EMIT_USER_LOST: {
      return reducerEmitUserLost(state);
    }
    case EMIT_USER_WIN: {
      return reducerEmitUserWin(state);
    }
    case USER_ADD_MALUS: {
      return reducerUserAddMalus(state, action);
    }
    default:
      return state
  }
}
