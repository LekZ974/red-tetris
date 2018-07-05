import { USER_SIGN_UP, USER_LOGIN } from '../actions/user'

const initialState = {}

export default function UserReducer (state = initialState, action = {}) {
  switch (action.type) {
    case USER_SIGN_UP: {
      if (action.status === 'success') {
        const { id, name, role } = action.payload
        return {
          ...state,
          [action.payload.id]: {
            id,
            name,
            role,
            selected: true
          }
        }
      }
      return state
    }
    case USER_LOGIN: {
      if (action.status === 'success') {
        const accounts = {
          ...action.payload.accounts,
          [Object.keys(action.payload.accounts)[0]]: {
            selected: true,
            ...action.payload.accounts[Object.keys(action.payload.accounts)[0]]
          }
        }
        return {
          ...state,
          ...accounts
        }
      }
      return state
    }
    default:
      return state
  }
}

