import { GRID_HEIGHT, GRID_WIDTH } from "../../common/grid";
import { PIECES_NUM } from "../../common/pieces";
import { store } from "../index";
import io from "socket.io-client";
import params from "../../../params";
import {updateUser, joinGame, updateGrid, leaveGame} from "../actions/user";
import {tetriNew} from "../actions/tetrimino";
import {shapeHandler} from "../utils/shapeHandler";
import {needNewPieces} from "../actions/game";
import {push} from "connected-react-router";

const socket = io.connect(params.server.url);

//RCV

const rcvPlayerLogged = data => {
  if (!data) {
    return;
  }
  const userData = {
    id: data.playerID,
    name: data.login,
    connected: true,
  }
  store.dispatch(updateUser(userData));
}

const rcvJoinGame = data => {
  store.dispatch(needNewPieces(store.getState().game))
}

const rcvGameExist = data => {
  if (!store.getState().user.gameName) {
    store.dispatch(joinGame(store.getState().user.name, store.getState().game.name))
  }
}

const rcvNewShape = data => {
  store.dispatch(tetriNew(store.getState().game, shapeHandler(data)))
}

const rcvLeftGame = data => {
  console.log("RCVLEAVE GAME", data)
  store.dispatch(leaveGame(data))
  store.dispatch(push('/'))
}

socket.on('logged', rcvPlayerLogged)
socket.on('gameJoined', rcvJoinGame)
socket.on('gameExists', rcvGameExist)
socket.on('emittedShape', rcvNewShape)
socket.on('leftGame', rcvLeftGame)

//EMIT

const emitLogin = userName => {
  socket.emit('login', {id: Math.random().toString(36).substring(2, 15), name: userName})
}

const emitJoinGame = (userName, gameName) => {
  socket.emit('joinGame', gameName)
  store.dispatch(updateUser({
    gameName,
    grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
  }))
}

const emitCreateGame = (gameName) => {
  socket.emit('createGame', gameName)
}

const emitGamePieces = () => {
  socket.emit('requestShape')
}

const emitUpdateGrid = grid => {
  store.dispatch(updateGrid(grid))
}

const emitLeaveGame = () => {
  socket.emit('leaveGame')
}

export {
  rcvPlayerLogged,
  rcvJoinGame,
  rcvGameExist,

  emitLogin,
  emitJoinGame,
  emitCreateGame,
  emitGamePieces,
  emitUpdateGrid,
  emitLeaveGame,
}
