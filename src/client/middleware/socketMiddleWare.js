import {GET_GAMES} from "../actions/games";
import {
  EMIT_GAME_STATUS,
  CREATE_GAME,
  EMIT_CREATE_GAME,
  NEED_NEW_PIECES
} from "../actions/game";
import {USER_JOIN_GAME, USER_LOGIN} from "../actions/user";
import {store} from "../index";
import {TETRI_IS_BLOCK, tetriInit, tetriNew} from "../actions/tetrimino";
import {shapeHandler} from "../utils/shapeHandler";
import * as SocketService from "../services/SocketService";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (type) {
        case USER_LOGIN : {
          SocketService.emitLogin(action.userName);
          break;
        }
        case USER_JOIN_GAME : {
          SocketService.emitJoinGame(action.userName, action.gameName)
        }
        case GET_GAMES : {
          socket.on('GET_GAMES', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case CREATE_GAME : {
          console.log("EMIT CREATE GAME ACTION", action)
          SocketService.emitCreateGame(action.gameName)
          // dispatch(tetriInit())
          // if( action.gameData ) socket.emit('createGame', action.gameData.gameName)
          // socket.on('gameExists', (data) => {
          //   if ('OK' === data) {
          //     dispatch(emitGamePieces(store.getState().game, store.getState().tetrimino))
          //   }
          // })
          break;
        }
        case EMIT_GAME_STATUS : {
          socket.emit('GAME_STATUS', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case NEED_NEW_PIECES : {
          SocketService.emitGamePieces(action.game)
          // socket.emit('requestShape')
          // socket.on('emittedShape', (data) => {
          //   action = {
          //     type: action.type,
          //     status: 'success',
          //     data,
          //   };
          //   dispatch(tetriNew(store.getState().game, shapeHandler(data)))
          // })
          break;
        }
        case TETRI_IS_BLOCK : {
          dispatch(emitGamePieces(store.getState().game, store.getState('tetrimino')))
          break;
        }
        default: {
          break;
        }
      }
      if (thenFn) thenFn(dispatch)
    }
    if (store.getState().tetrimino.needNext) {
      console.log("NEED UPGRADE GRID", store.getState().user.grid)
    }

    return next(action)
  }
}

export default socketMiddleware
