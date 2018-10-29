import {GET_GAMES} from "../actions/games";
import {EMIT_GAME_STATUS, EMIT_GAME_PIECES, EMIT_CREATE_GAME} from "../actions/game";
import {USER_LOGIN} from "../actions/user";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (type) {
        case USER_LOGIN : {
          socket.emit('login', {id: action.userName})
          socket.on('logged', data => {
            action = {
              type: action.type,
              status: 'success',
              id: Math.random().toString(36).substring(2, 15),
              name: action.user.userName,
              gameName: action.user.gameName,
              connected: true,
              grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
            }
            return 'OK' === data && next(action);
          }
        )
          break;
        }
        case GET_GAMES : {
          socket.on('GET_GAMES', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case EMIT_CREATE_GAME : {
          if( action.game ) socket.emit('createGame', action.game.gameName)
          socket.on('gameExists', (data) => console.log(data))
          break;
        }
        case EMIT_GAME_STATUS : {
          socket.emit('GAME_STATUS', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case EMIT_GAME_PIECES : {
          socket.emit('requestShape')
          socket.on('emittedShape', (data) => console.log(data))
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
