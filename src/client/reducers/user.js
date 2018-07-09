import { USER_LOGIN } from '../actions/user'

const initialState = {
  id: '',
  userName: '',
  roomName: '',
  role: '',
  connnected: false,
  payload: {}
}

export default function UserReducer (state = initialState, action = {}) {

  console.log('State', state)
  console.log('Action', action)
  switch (action.type) {
    case USER_LOGIN: {
      if (action.status === 'success') {
        const { id, userName, roomName, role , connected} = action.payload
        return {
          ...state,
          id,
          userName,
          roomName,
          role,
          connected
        }
      }
      return state
    }
    default:
      return state
  }
}

