import {GET_GAMES} from "../actions/games";
import {GAME_STATUS} from "../actions/game";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (action.type) {
        case GET_GAMES : {
          socket.on('GET_GAMES', (payload) => {
            console.log('GETGAMES', payload)
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
        }
        case GAME_STATUS : {
          console.log('Action', action)
          socket.on('GAME_STATUS', (payload) => {
            console.log('GAMESTATUS', payload)
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
        }
        default: {
          return next(action)
        }
      }
    }
  }
}

export default socketMiddleware
