import { USER_LOGIN } from '../actions/user'

const initialState = {
  id: '',
  userName: '',
  gameName: '',
  role: '',
  payload: {}
}

export default function UserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case USER_LOGIN: {
      if (action.status === 'success') {
        console.log('POPO', action)
        const { id, userName, gameName, role } = action.payload
        return {
          ...state,
          id,
          userName,
          gameName,
          role
        }
      }
      return state
    }
    default:
      return state
  }
}

