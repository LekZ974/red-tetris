import {GET_GAMES} from '../actions/games'

const initialState = {
  items: [],
  isLoading: false,
}

export default function GamesReducer (state = initialState, action = {}) {
  switch (action.type) {
    case GET_GAMES: {
      if ('success' === action.status){
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

