import { store } from "../index"
import io from "socket.io-client"
import params from "../../../params"
import {
  rcvJoinGame,
  updateGrid,
  rcvUserLeaveGame,
  rcvLogin,
  emitUserLost,
  rcvUserCanStart,
  updateUser,
  emitUserIsWinner,
  init,
  addMalusToUser,
} from '../actions/user'
import {tetriInitState} from '../actions/tetrimino'
import {rcvGetGames} from "../actions/games"
import {
  gameInit,
  rcvCreateGame,
  rcvGameStatus,
  rcvNewPieces,
  updatePlayers,
  rcvGameIsFinished,
  rcvGameCanRestart,
  emitNewPieces,
  updateGame,
  someoneIsJoined,
  someoneIsLeft,
} from "../actions/game"
import {notify} from '../utils/notificationHandler'
import {PIECES_NUM} from "../../common/pieces";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import { GAME_MODE, USER_ROLE, SOCKET, GAME_STATUS, TYPE_MESSAGE } from '../../common/const';

const socket = io.connect(params.server.socketUrl)

//RCV

const rcvPlayerLogged = data => {
  store.dispatch(rcvLogin(data))
}

const rcvGameJoined = data => {
  store.dispatch(rcvJoinGame(data))
}

const rcvGameExists = data => {
  store.dispatch(rcvCreateGame(data))
}

const rcvGameCanStart = data => {
  store.dispatch(rcvUserCanStart(data))
}

const rcvNewShape = data => {
  store.dispatch(rcvNewPieces(data.shape))
  if (data.soloplay && data.soloplay.hasOwnProperty('solo_mode') && !!data.soloplay.solo_mode && store.getState().game.gameIsStarted) {
    store.dispatch(updateUser({count: data.soloplay.count, speedDelay: data.soloplay.speed, level: data.soloplay.level}))
  }
}

const rcvLeftGame = data => {
  store.dispatch(rcvUserLeaveGame(data))
}

const rcvGames = data => {
  store.dispatch(rcvGetGames(data))
}

const rcvGridUpdated = data => {
  if ('OK' === data.stat && store.getState().game.gameIsStarted) {
    store.dispatch(updateGrid(data.board))
  }
}

const rcvGameIsStarted = data => {
  store.dispatch(tetriInitState())
  if (data.multi) {
    store.dispatch(updateGame({
      params: {
        ...store.getState().game.params,
        gameMode: GAME_MODE.multi,
      }}))
    store.dispatch(updateUser({
      grid: data.board,
      count: data.multi.count,
      speedDelay: data.multi.speed,
      level: data.multi.level
    }))
  }
  else if (data.solo) {
    store.dispatch(updateGame({
      params: {
        ...store.getState().game.params,
        gameMode: GAME_MODE.solo
      }}))
    store.dispatch(updateUser({
      grid: data.board,
      count: data.solo.count,
      speedDelay: data.solo.speed,
      level: data.solo.level
    }))
  }
  store.dispatch(rcvGameStatus(GAME_STATUS.start))
  store.dispatch(emitNewPieces())
}

const rcvUserStatus = data => {
  if (data.isMaster) {
    store.dispatch(updateUser({role: USER_ROLE.master}))
    notify('You are the new master', TYPE_MESSAGE.info)
  }
}

const rcvSpectres = data => {
  store.dispatch(updatePlayers(data))
}

const rcvAllPlayers = data => {
  const newData = data.map(player =>
    Object.assign({spectre: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty))}, player)
  )
  store.dispatch(updatePlayers(newData))
}

const rcvGameFinished = data => {
  if (!!store.getState().game.gameIsStarted) {
    store.dispatch(rcvGameIsFinished(data))
    store.dispatch(updateUser({prevScore: store.getState().user.score}))
    store.dispatch(tetriInitState())
    store.dispatch(gameInit())
    store.dispatch(init())
  }
}

const rcvCanRestartGame = data => {
  store.dispatch(rcvGameCanRestart(data))
}

const rcvMalus = data => {
  store.dispatch(addMalusToUser(data))
}

const rcvSomeoneJoined = data => {
  store.dispatch(someoneIsJoined(data))
}

const rcvSomeoneLeft = data => {
  store.dispatch(someoneIsLeft(data))
}

const rcvScoreUpdated = data => {
  if (store.getState().game.gameIsStarted) {
    store.dispatch(updateUser({score: data}))
  }
}

socket.on(SOCKET.LOGGED, rcvPlayerLogged)
socket.on(SOCKET.GAME_JOINED, rcvGameJoined)
socket.on(SOCKET.GAME_EXISTS, rcvGameExists)
socket.on(SOCKET.CAN_START, rcvGameCanStart)
socket.on(SOCKET.EMITTED_SHAPE, rcvNewShape)
socket.on(SOCKET.LEFT_GAME, rcvLeftGame)
socket.on(SOCKET.GAMES_SENT, rcvGames)
socket.on(SOCKET.BOARD_UPDATED, rcvGridUpdated)
socket.on(SOCKET.GAME_STARTED, rcvGameIsStarted)
socket.on(SOCKET.UPDATE_STATUS, rcvUserStatus)
socket.on(SOCKET.SPECTRES_UPDATED, rcvSpectres)
socket.on(SOCKET.ALL_PLAYERS, rcvAllPlayers)
socket.on(SOCKET.GAME_FINISHED, rcvGameFinished)
socket.on(SOCKET.CAN_RESTART, rcvCanRestartGame)
socket.on(SOCKET.MALUS_UPDATED, rcvMalus)
socket.on(SOCKET.SOMEONE_JOINED, rcvSomeoneJoined)
socket.on(SOCKET.SOMEONE_LEFT, rcvSomeoneLeft)
socket.on(SOCKET.SCORE_UPDATED, rcvScoreUpdated)

//EMIT

const emitLogin = userName => {
  socket.emit(SOCKET.LOGIN, {id: userName, name: userName})
}

const emitJoinGame = (userName, gameName) => {
  socket.emit(SOCKET.JOIN_GAME, gameName)
}

const emitCreateGame = (gameName, isSolo) => {
  socket.emit(SOCKET.CREATE_GAME, gameName, isSolo)
}

const emitNeedPieces = () => {
  socket.emit(SOCKET.REQUEST_SHAPE)
}

const emitUpdateGrid = grid => {
  socket.emit(SOCKET.UPDATE_BOARD, grid)
}

const emitGameStatus = (status) => {
  switch (status) {
    case GAME_STATUS.start : {
      socket.emit(SOCKET.START_GAME)
      break;
    }
    case GAME_STATUS.restart : {
      socket.emit(SOCKET.RESTART_GAME)
      break;
    }
    default : {
      store.dispatch(rcvGameStatus(status))
    }
  }
}

const emitLeaveGame = () => {
  socket.emit(SOCKET.LEAVE_GAME)
}

const emitGetGames = () => {
  socket.emit(SOCKET.GET_GAMES)
}

const emitUserLose = () => {
  store.dispatch(emitUserLost())
  emitGameStatus(GAME_STATUS.stop)
}

const emitUserWin = () => {
  store.dispatch(emitUserIsWinner())
  emitGameStatus(GAME_STATUS.stop)
}

const emitUpdateParamsGame = data => {
  store.dispatch(updateGame({params: {
      ...store.getState().game.params,
      ...data,
    }}))
}

export {
  rcvPlayerLogged,
  rcvGameExists,
  rcvGameJoined,
  rcvGames,
  rcvLeftGame,
  rcvNewShape,

  emitLogin,
  emitJoinGame,
  emitCreateGame,
  emitNeedPieces,
  emitUpdateGrid,
  emitGameStatus,
  emitLeaveGame,
  emitGetGames,
  emitUserLose,
  emitUserWin,
  emitUpdateParamsGame,
}
