import {GET_GAMES} from '../actions/games'

const initialState = {
  items: [],
  isLoading: false,
  payload: {}
}

export default function GamesReducer (state = initialState, action = {}) {
  switch (action.type) {
    case GET_GAMES: {
      if (action.status === 'success'){
        return {
          ...state,
          items: action.payload,
          isLoading: false
        }
      }
      if (!action.payload) {
        return {
          ...state,
          items: [],
          isLoading: false
        }
      }
      return {
        ...state,
        isLoading: true
      }
    }
    default:
      return state
  }
}

