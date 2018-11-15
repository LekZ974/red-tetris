import {EMIT_GET_GAMES, GET_GAMES, RCV_GET_GAMES} from "../actions/games";
import {
  UPDATE_GAME_STATUS,
  CREATE_GAME,
  NEED_NEW_PIECES
} from "../actions/game";
import {USER_JOIN_GAME, USER_LEFT_GAME, USER_LOGIN, USER_UPDATE_GRID, leaveGame, USER_CONNECT} from "../actions/user";
import {store} from "../index";
import {TETRI_INIT, TETRI_NEW, tetriInit} from "../actions/tetrimino";
import * as SocketService from "../services/SocketService";
import * as TetriService from "../services/TetriService";
import {emitUpdateGrid} from "../services/SocketService";
import { push } from "connected-react-router";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (type) {
        case USER_CONNECT : {
          window.location.reload()
        }
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
        case USER_LEFT_GAME : {
          store.dispatch(push('/'))
          window.location.reload()
          return next(action)
        }
        case EMIT_GET_GAMES: {
          SocketService.emitGetGames()
          break;
        }
        case RCV_GET_GAMES: {
          if (!action.payload || action.payload.length < 1) {
            action.payload = null
          }
          break;
        }
        case CREATE_GAME : {
          SocketService.emitCreateGame(action.gameName)
          break;
        }
        case UPDATE_GAME_STATUS : {
          if (action.status === 'Stop') {
            store.dispatch(leaveGame())
          }
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
