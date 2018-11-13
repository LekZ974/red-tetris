import {GET_GAMES} from "../actions/games";
import {
  UPDATE_GAME_STATUS,
  CREATE_GAME,
  EMIT_CREATE_GAME,
  NEED_NEW_PIECES
} from "../actions/game";
import {USER_JOIN_GAME, USER_LOGIN, USER_UPDATE_GRID} from "../actions/user";
import {store} from "../index";
import {TETRI_INIT, TETRI_NEW, tetriInit} from "../actions/tetrimino";
import * as SocketService from "../services/SocketService";
import * as TetriService from "../services/TetriService";
import {emitUpdateGrid} from "../services/SocketService";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (type) {
        case TETRI_INIT : {
          return next(action)
        }
        case TETRI_NEW : {
          return next(action)
        }
        case USER_LOGIN : {
          SocketService.emitLogin(action.userName);
          break;
        }
        case USER_JOIN_GAME : {
          SocketService.emitJoinGame(action.userName, action.gameName)
          break;
        }
        case GET_GAMES : {
          socket.on('GET_GAMES', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case CREATE_GAME : {
          SocketService.emitCreateGame(action.gameName)
          break;
        }
        case UPDATE_GAME_STATUS : {
          socket.emit('GAME_STATUS', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
          break;
        }
        case NEED_NEW_PIECES : {
          SocketService.emitGamePieces()
          break;
        }
        case USER_UPDATE_GRID : {
          return next(action)
        }
        default: {
          break;
        }
      }
      if (thenFn) thenFn(dispatch)
    }
    if (store.getState().tetrimino.needNext) {
      emitUpdateGrid(TetriService.placePiece(store.getState().user.grid, store.getState().tetrimino))
      SocketService.emitGamePieces()
      store.dispatch(tetriInit())
    }
    return next(action)
  }
}

export default socketMiddleware
