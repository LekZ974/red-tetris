import {USER_INIT, USER_LOGIN, USER_CONNECT, USER_UPDATE_GRID, USER_UPDATE} from '../../actions/user'

export const initialState = {
  id: '',
  name: '',
  gameName: '',
  role: '',
  connected: false,
  grid: [],
  payload: {}
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
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
      return {
        ...state,
        grid: action.grid
      }
    }
    default:
      return state
  }
}
