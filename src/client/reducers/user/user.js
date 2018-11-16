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
  RCV_USER_LEAVE_GAME,
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
  loosed: false,
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
    case RCV_USER_LEAVE_GAME: {
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
        connected: false
      }
    }
    case USER_UPDATE_GRID: {
      let newGrid = action.grid
      let nbLineDel;
      [newGrid, nbLineDel] = TetriService.gridDelLine(newGrid);

      const loose = TetriService.asLoose(newGrid);

        return {
        ...state,
        completeLine: nbLineDel,
        grid: newGrid,
        loosed: loose,
      }
    }
    default:
      return state
  }
}
