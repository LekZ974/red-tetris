import { USER_LOGIN } from '../actions/user'

const initialState = {
  id: '',
  userName: '',
  roomName: '',
  role: '',
  payload: {}
}

export default function UserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN: {
      if (action.status === 'success') {
        const { id, userName, roomName, role } = action.payload
        return {
          ...state,
          id,
          userName,
          roomName,
          role
        }
      }
      return state
    }
    default:
      return state
  }
}

