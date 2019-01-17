import {EMIT_GET_GAMES, RCV_GET_GAMES} from '../../actions/games'
import {reducerEmitGetGames, reducerRcvGetGames} from "./functions";

export const initialState = {
  items: [],
  isLoading: false,
}

export default function GamesReducer (state = initialState, action = {}) {
  switch (action.type) {
    case EMIT_GET_GAMES: {
      return reducerEmitGetGames(state);
    }
    case RCV_GET_GAMES: {
      return reducerRcvGetGames(state, action)
    }
    default:
      return {...state}
  }
}

