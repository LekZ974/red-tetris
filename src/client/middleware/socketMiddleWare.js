import {EMIT_GET_GAMES, GET_GAMES, RCV_GET_GAMES} from "../actions/games";
import {
  EMIT_GAME_STATUS,
  RCV_GAME_STATUS,
  EMIT_CREATE_GAME,
  RCV_CREATE_GAME,
  EMIT_NEW_PIECES,
  RCV_NEW_PIECES,
  UPDATE_PLAYERS,
  emitNewPieces,
  RCV_GAME_IS_FINISHED,
  GAME_INIT_STATE,
  GAME_INIT,
} from '../actions/game';
import {
  EMIT_USER_JOIN_GAME,
  RCV_USER_JOIN_GAME,
  EMIT_USER_LOGIN,
  USER_UPDATE_GRID,
  USER_CONNECT,
  updateUser,
  emitJoinGame,
  RCV_USER_LOGIN,
  EMIT_USER_LEAVE_GAME,
  RCV_USER_LEAVE_GAME,
  EMIT_USER_LOST,
  EMIT_USER_WIN,
  RCV_USER_CAN_START,
  USER_INIT_STATE,
  USER_INIT,
} from "../actions/user";
import {store} from "../index";
import {notify} from "../utils/notificationHandler";
import {TETRI_INIT, TETRI_NEW, TETRI_INIT_STATE, tetriInit, tetriNew} from "../actions/tetrimino";
import * as SocketService from "../services/SocketService";
import * as TetriService from "../services/TetriService";
import { push } from "connected-react-router";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";
import {shapeHandler} from "../utils/shapeHandler";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    const { type, thenFn} = action

    if (socket) {
      switch (type) {
        //
        case EMIT_USER_LOGIN : {
          SocketService.emitLogin(action.userName);
          break;
        }
        case RCV_USER_LOGIN : {
          if (!action.data) {
            return;
          }
          const userData = {
            name: action.data.login,
            connected: true,
          }
          !userData.name ? store.dispatch(emitLeaveGame()) : store.dispatch(updateUser(userData));
          break;
        }
        case EMIT_USER_LEAVE_GAME : {
          SocketService.emitLeaveGame()
          break;
        }
        case RCV_USER_LEAVE_GAME : {
          store.dispatch(push('/'))
          return next(action)
        }
        case EMIT_USER_JOIN_GAME : {
          SocketService.emitJoinGame(action.userName, action.gameName)
          break;
        }
        case RCV_USER_JOIN_GAME : {
          if (action.data) {
            store.dispatch(updateUser({
              gameName: store.getState().game.name,
              grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
            }))
          }
          break;
        }
        case EMIT_GET_GAMES: {
          SocketService.emitGetGames()
          break;
        }
        case RCV_GET_GAMES: {
          break;
        }
        case EMIT_CREATE_GAME : {
          SocketService.emitCreateGame(action.gameName)
          break;
        }
        case RCV_CREATE_GAME : {
          if (!store.getState().user.gameName) {
            store.dispatch(emitJoinGame(store.getState().user.name, store.getState().game.name))
          }
          break;
        }
        case RCV_USER_CAN_START : {
          if ('KO' === action.data) {
            store.dispatch(updateUser({role: 'challenger'}))
            notify('You are a challenger', 'info')
          } else {
            notify('You are the master!', 'info')
          }
          break;
        }
        case EMIT_GAME_STATUS : {
          SocketService.emitGameStatus(action.gameStatus)
          return next(action)
        }
        case RCV_GAME_STATUS : {
          return next(action)
        }
        case EMIT_NEW_PIECES : {
          SocketService.emitNeedPieces()
          break;
        }
        case RCV_NEW_PIECES : {
          store.dispatch(tetriNew(store.getState().game, shapeHandler(action.data)))
          break;
        }
        case USER_UPDATE_GRID : {
          return next(action)
        }
        case USER_CONNECT : {
          window.location.reload()
        }
        case TETRI_INIT : {
          return next(action)
        }
        case TETRI_NEW : {
          return next(action)
        }
        case EMIT_USER_LOST : {
          notify('You loose!!', 'error')
          return next(action)
        }
        case EMIT_USER_WIN : {
          notify('You win!!', 'success')
          return next(action)
        }
        case UPDATE_PLAYERS : {
          return next(action)
        }
        case RCV_GAME_IS_FINISHED : {
          if (store.getState().game.gameIsStarted) {
            switch (action.data) {
              case 'winner':
                SocketService.emitUserWin()
                SocketService.emitUpdateGrid(TetriService.placePiece(store.getState().user.grid, store.getState().tetrimino))
                return next(action)
              case 'loser':
                SocketService.emitUserLose()
                SocketService.emitUpdateGrid(TetriService.placePiece(store.getState().user.grid, store.getState().tetrimino))
                return next(action)
              default:
                break;
            }
          }
        }
        case GAME_INIT_STATE: {
          return next(action)
        }
        case TETRI_INIT_STATE: {
          return next(action)
        }
        case USER_INIT_STATE: {
          return next(action)
        }
        case USER_INIT: {
          return next(action)
        }
        case GAME_INIT: {
          return next(action)
        }
        default: {
          break;
        }
      }
      if (thenFn) thenFn(dispatch)
    }
    if (TetriService.asLose(store.getState().user.grid)) {
      SocketService.emitUserLose()
    }
    if (store.getState().tetrimino.needNext) {
      SocketService.emitUpdateGrid(TetriService.placePiece(store.getState().user.grid, store.getState().tetrimino))
      SocketService.emitNeedPieces()
      store.dispatch(tetriInit())
    }
    TetriService.addMalusBlocks(store.getState().user.grid, store.getState().user.malus)
    return next(action)
  }
}

export default socketMiddleware
