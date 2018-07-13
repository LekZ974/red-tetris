import {GET_ROOMS} from '../actions/rooms'

const initialState = {
  items: [],
  isLoading: false,
  payload: {}
}

export default function RoomsReducer (state = initialState, action = {}) {
  switch (action.type) {
    case GET_ROOMS: {
      if (action.status === 'success'){
        console.log("REDUCER ROOMS", action)
        return {
          ...state,
          items: action.payload,
          isLoading: false
        }}
        return {
          ...state,
          isLoading: true
        }
    }
    default:
      return state
  }
}

