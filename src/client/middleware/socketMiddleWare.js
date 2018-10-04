import {GET_GAMES} from "../actions/games";
import {EMIT_GAME_STATUS, EMIT_GAME_PIECES, EMIT_CREATE_GAME} from "../actions/game";
import {USER_LOGIN} from "../actions/user";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (type) {
        case GET_GAMES : {
          socket.on('GET_GAMES', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case EMIT_CREATE_GAME : {
          if( action.game ) socket.emit('createGame', action.game.gameName)
          break;
        }
        case EMIT_GAME_STATUS : {
          socket.emit('GAME_STATUS', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case EMIT_GAME_PIECES : {
          socket.emit('EMIT_GAME_PIECES', (payload) => {
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
