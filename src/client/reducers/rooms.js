import { ROOMS_LIST } from '../actions/rooms'

const initialState = {
  items: [],
  isLoading: false,
  payload: {}
}

export default function RoomsReducer (state = initialState, action = {}) {
  switch (action.type) {
    case ROOMS_LIST: {
      if (action.status === 'success') {
        return {
          ...state,
          items: action.payload.rooms,
          isLoading: false
        }
      }
      return state
    }
    default:
      return state
  }
}

