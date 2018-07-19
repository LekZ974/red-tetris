import { USER_LOGIN } from '../actions/user'

const initialState = {
  id: '',
  userName: '',
  gameName: '',
  role: '',
  connected: false,
  payload: {}
}

export default function UserReducer (state = initialState, action = {}) {

  console.log(action)
  switch (action.type) {
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
    default:
      if (action.payload && action.payload.user) {
        action.payload.user.connected = false
      }
      return state
  }
}

