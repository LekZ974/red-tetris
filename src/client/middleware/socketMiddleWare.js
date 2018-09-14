import {GET_GAMES} from "../actions/games";
import {EMIT_GAME_STATUS, EMIT_GAME_PIECES} from "../actions/game";

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
            console.log('SOCKET ON GETGAMES', payload)
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case EMIT_GAME_STATUS : {
          console.log('EMIT_GAME_STATUS', action)
          socket.emit('EMIT_GAME_STATUS', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case EMIT_GAME_PIECES : {
          socket.emit('EMIT_GAME_PIECES', (payload) => {
            console.log('EMIT_GAME_PIECES', payload)
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        default: {
          break;
        }
      }
      if (thenFn) thenFn(dispatch)
    }
    return next(action)
  }
}

export default socketMiddleware
