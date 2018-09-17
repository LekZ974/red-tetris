import {GET_GAMES} from '../actions/games'

const initialState = {
  items: [],
  isLoading: false,
}

export default function GamesReducer (state = initialState, action = {}) {
  console.log('PAYLOAD === ', action.payload, action.status)
  console.log('ACTION', action)
  switch (action.type) {
    case GET_GAMES: {
      console.log('GET GAMES')
      if ('success' === action.status){
        console.log('STATUS SUCCESS')
        return {
          ...state,
          items: action.payload,
          isLoading: false
        }
      }
      if (!action.payload) {
        console.log('STATUS UNSUCCESS')
        return {
          ...state,
          items: [],
          isLoading: false
        }
      }
      console.log('STATUS is loading')
      return {
        ...state,
        isLoading: true
      }
    }
    default:
      return state
  }
}

