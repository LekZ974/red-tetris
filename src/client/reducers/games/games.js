import {GET_GAMES} from '../../actions/games'
import {reducerGetGames} from "./functions";

export const initialState = {
  items: [],
  isLoading: false,
}

export default function GamesReducer (state = initialState, action = {}) {
  switch (action.type) {
    case GET_GAMES: {
      return reducerGetGames(state, action)
    }
    default:
      return state
  }
}

