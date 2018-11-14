import {USER_INIT, USER_LOGIN, USER_CONNECT, USER_UPDATE_GRID, USER_UPDATE, USER_LEFT_GAME} from '../../actions/user'
import * as TetriService from '../../services/TetriService';

export const initialState = {
  id: '',
  name: '',
  gameName: '',
  role: '',
  connected: false,
  grid: [],
  completeLine: 0,
  payload: {},
  loosed: false,
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
    case USER_LEFT_GAME : {
      return {
        ...initialState,
      }
    }
    case USER_CONNECT : {
      return {
        ...state,
        connected: true
      }
    }
    case USER_LOGIN: {
      if (action.status === 'success') {
        const { id, name, gameName, role , connected, grid} = action
        return {
          ...state,
          id,
          name,
          gameName,
          role,
          connected,
          grid
        }
      }
      return state
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
