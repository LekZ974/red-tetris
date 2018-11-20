import { GRID_HEIGHT, GRID_WIDTH } from "../../common/grid";
import { PIECES_NUM } from "../../common/pieces";
import { store } from "../index";
import io from "socket.io-client";
import params from "../../../params";
import {updateUser, rcvJoinGame, updateGrid, rcvLeaveGame, rcvLogin, rcvUserCanStart} from "../actions/user";
import {rcvGetGames} from "../actions/games";
import {tetriNew} from "../actions/tetrimino";
import {shapeHandler} from "../utils/shapeHandler";
import {needNewPieces, rcvCreateGame, rcvGameStatus, rcvNewPieces, updateGameStatus} from "../actions/game";

const socket = io.connect(params.server.url);

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

socket.on('logged', rcvPlayerLogged)
socket.on('gameJoined', rcvGameJoined)
socket.on('gameExists', rcvGameExists)
socket.on('canStart', rcvGameCanStart)
socket.on('emittedShape', rcvNewShape)
socket.on('leftGame', rcvLeftGame)
socket.on('gamesSent', rcvGames)
socket.on('boardUpdated', rcvGridUpdated)

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

const emitGameStatus = (status, game) => {
  store.dispatch(rcvGameStatus(status, game))
}

const emitLeaveGame = () => {
  socket.emit('leaveGame')
}

const emitGetGames = () => {
  socket.emit('getGames')
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
}
