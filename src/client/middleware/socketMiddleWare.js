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
          break;
        }
        case GAME_STATUS : {
          socket.emit('GAME_STATUS', (payload) => {
            console.log('GAME_STATUS', payload)
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        default: {
          console.log('Action', action, action.thenFn)
          console.log('Next', next)
          break;
        }
      }
      if (thenFn) thenFn(dispatch)
    }
    return next(action)
  }
}

export default socketMiddleware
