import { store } from "../index"
import io from "socket.io-client"
import params from "../../../params"
import {
  rcvJoinGame,
  updateGrid,
  rcvLeaveGame,
  rcvLogin,
  emitUserLost,
  rcvUserCanStart,
  updateUser,
  emitUserIsWinner,
} from '../actions/user'
import {rcvGetGames} from "../actions/games"
import {rcvCreateGame, rcvGameStatus, rcvNewPieces, updatePlayers, rcvGameIsFinished} from "../actions/game"
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
  store.dispatch(rcvNewPieces(data))
}

const rcvLeftGame = data => {
  store.dispatch(rcvLeaveGame(data))
}

const rcvGames = data => {
  store.dispatch(rcvGetGames(data))
}

const rcvGridUpdated = data => {
  //dispatch updateGrid here but need data with grid
}

const rcvGameIsStarted = data => {
  store.dispatch(rcvGameStatus('Start'))
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
  store.dispatch(rcvGameIsFinished(data))
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

//EMIT

const emitLogin = userName => {
  socket.emit('login', {id: userName, name: userName})
}

const emitJoinGame = (userName, gameName) => {
  socket.emit('joinGame', gameName)
}

const emitCreateGame = (gameName) => {
  socket.emit('createGame', gameName)
}

const emitNeedPieces = () => {
  socket.emit('requestShape')
}

const emitUpdateGrid = grid => {
  socket.emit('updateBoard', grid)
  store.dispatch(updateGrid(grid))
}

const emitGameStatus = (status) => {
  switch (status) {
    case 'Start' : {
      socket.emit('startGame')
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

const emitUserLoose = () => {
  store.dispatch(emitUserLost())
}

const emitUserWin = () => {
  store.dispatch(emitUserIsWinner())
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
  emitUserLoose,
  emitUserWin,
}
