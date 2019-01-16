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
  userInitState,
  init,
  addMalusToUser,
} from '../actions/user'
import {tetriInitState} from '../actions/tetrimino'
import {rcvGetGames} from "../actions/games"
import {
  gameInitState,
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
import {alertInit} from "../actions/alert";
import {notify} from '../utils/notificationHandler'
import {PIECES_NUM} from "../../common/pieces";
import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";

const socket = io.connect(params.server.url)

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
  store.dispatch(alertInit())
  if (data.multi) {
    store.dispatch(updateGame({
      params: {
        ...store.getState().game.params,
        gameMode: 'MULTI'
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
        gameMode: 'SOLO'
      }}))
    store.dispatch(updateUser({
      grid: data.board,
      count: data.solo.count,
      speedDelay: data.solo.speed,
      level: data.solo.level
    }))
  }
  store.dispatch(rcvGameStatus('Start'))
  store.dispatch(emitNewPieces())
}

const rcvUserStatus = data => {
  if (data.isMaster) {
    store.dispatch(updateUser({role: 'master'}))
    notify('You are the new master', 'info')
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

socket.on('logged', rcvPlayerLogged)
socket.on('gameJoined', rcvGameJoined)
socket.on('gameExists', rcvGameExists)
socket.on('canStart', rcvGameCanStart)
socket.on('emittedShape', rcvNewShape)
socket.on('leftGame', rcvLeftGame)
socket.on('gamesSent', rcvGames)
socket.on('boardUpdated', rcvGridUpdated)
socket.on('gameStarted', rcvGameIsStarted)
socket.on('updateStatus', rcvUserStatus)
socket.on('spectresUpdated', rcvSpectres)
socket.on('allPlayers', rcvAllPlayers)
socket.on('gameFinished', rcvGameFinished)
socket.on('canRestart', rcvCanRestartGame)
socket.on('malusUpdated', rcvMalus)
socket.on('someoneJoined', rcvSomeoneJoined)
socket.on('someoneLeft', rcvSomeoneLeft)
socket.on('scoreUpdated', rcvScoreUpdated)

//EMIT

const emitLogin = userName => {
  socket.emit('login', {id: userName, name: userName})
}

const emitJoinGame = (userName, gameName) => {
  socket.emit('joinGame', gameName)
}

const emitCreateGame = (gameName, isSolo) => {
  socket.emit('createGame', gameName, isSolo)
}

const emitNeedPieces = () => {
  socket.emit('requestShape')
}

const emitUpdateGrid = grid => {
  socket.emit('updateBoard', grid)
}

const emitGameStatus = (status) => {
  switch (status) {
    case 'Start' : {
      socket.emit('startGame')
      break;
    }
    case 'Restart' : {
      socket.emit('restartGame')
      break;
    }
    default : {
      store.dispatch(rcvGameStatus(status))
    }
  }
}

const emitLeaveGame = () => {
  socket.emit('leaveGame')
}

const emitGetGames = () => {
  socket.emit('getGames')
}

const emitUserLose = () => {
  store.dispatch(emitUserLost())
  emitGameStatus('Stop')
}

const emitUserWin = () => {
  store.dispatch(emitUserIsWinner())
  emitGameStatus('Stop')
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
