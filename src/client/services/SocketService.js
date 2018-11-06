import { GRID_HEIGHT, GRID_WIDTH } from "../../common/grid";
import { PIECES_NUM } from "../../common/pieces";
import { store } from "../index";
import io from "socket.io-client";
import params from "../../../params";
import { updateUser, joinGame } from "../actions/user";
import {tetriInit, tetriNew} from "../actions/tetrimino";
import {shapeHandler} from "../utils/shapeHandler";
import {needNewPieces} from "../actions/game";

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
  console.log("RCVJOIN GAME", data)
  store.dispatch(needNewPieces(store.getState().game))
}

const rcvGameExist = data => {
  console.log("RCVGAMEEXIST", data)
  console.log(store.getState().user)
  if (!store.getState().user.gameName) {
    store.dispatch(joinGame(store.getState().user.name, store.getState().game.name))
  }
}

const rcvNewShape = data => {
  console.log("RCV NEW SHAPE", data)
  store.dispatch(tetriNew(store.getState().game, shapeHandler(data)))
}

socket.on('logged', rcvPlayerLogged)
socket.on('gameJoined', rcvJoinGame)
socket.on('gameExists', rcvGameExist)
socket.on('emittedShape', rcvNewShape)

//EMIT

const emitLogin = userName => {
  socket.emit('login', {id: Math.random().toString(36).substring(2, 15), name: userName})
}

const emitJoinGame = (userName, gameName) => {
  socket.emit('joinGame', gameName)
  console.log("UPDATE USER JOIN GAME", gameName)
  store.dispatch(updateUser({
    gameName,
    grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
  }))
}

const emitCreateGame = (gameName) => {
  socket.emit('createGame', gameName)
  store.dispatch(tetriInit())
}

const emitGamePieces = game => {
  console.log("EMIT GAME PIECE", game)
  socket.emit('requestShape')
}

export {
  rcvPlayerLogged,
  rcvJoinGame,
  rcvGameExist,
  emitLogin,
  emitJoinGame,
  emitCreateGame,
  emitGamePieces,
}
