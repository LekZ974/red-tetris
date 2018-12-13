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
  EMIT_USER_LOST
} from '../../actions/user'
import * as TetriService from '../../services/TetriService';

export const initialState = {
  id: '',
  name: '',
  gameName: '',
  role: 'master',
  connected: false,
  grid: [],
  completeLine: 0,
  payload: {},
  lost: false,
  winner: false,
  isLoading: false,
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
    case USER_CONNECT : {
      return {
        ...state,
        connected: true
      }
    }
    case EMIT_USER_LOGIN: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case RCV_USER_LOGIN: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case EMIT_USER_JOIN_GAME: {
      return {
        ...state,
        name: action.userName,
        gameName: action.gameName,
        isLoading: true,
      }
    }
    case RCV_USER_JOIN_GAME: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case EMIT_USER_LEAVE_GAME: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case USER_INIT_STATE: {
      return initialState
    }
    case USER_UPDATE : {
      return {
        ...state,
        ...action.data,
      }
    }
    case USER_INIT: {
      return {
        ...state,
        connected: false,
        grid: [],
        completeLine: 0,
        payload: {},
        lost: false,
        winner: false,
        isLoading: false,
      }
    }
    case USER_UPDATE_GRID: {
      let newGrid = action.grid
      let nbLineDel;
      [newGrid, nbLineDel] = TetriService.gridDelLine(newGrid);

      const lose = TetriService.asLose(newGrid);

        return {
        ...state,
        completeLine: nbLineDel,
        grid: newGrid,
        lost: lose,
      }
    }
    case EMIT_USER_LOST: {
      return {
        ...state,
        connected: false,
        lost: false,
        grid: []
      }
    }
    default:
      return state
  }
}
