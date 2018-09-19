import {USER_INIT, USER_LOGIN, USER_CONNECT} from '../actions/user'

const initialState = {
  id: '',
  userName: '',
  gameName: '',
  role: '',
  connected: false,
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
        const { id, userName, gameName, role , connected} = action.payload
        return {
          ...state,
          id,
          userName,
          gameName,
          role,
          connected
        }
      }
      return state
    }
    case USER_INIT: {
      return {
        ...state,
        connected: false
      }
    }
    default:
      return state
  }
}

