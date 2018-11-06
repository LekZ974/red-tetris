import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

export const USER_CONNECT = 'user/USER_CONNECT'
export const USER_LOGIN = 'user/USER_LOGIN'
export const USER_JOIN_GAME = 'user/USER_JOIN_GAME'
export const USER_INIT = 'user/USER_INIT'
export const USER_UPDATE = 'user/USER_UPDATE'
export const USER_UPDATE_GRID = 'user/USER_UPDATE_GRID'

export const connect = user => ({
  type: USER_CONNECT,
})

export const login = userName => ({
  type: USER_LOGIN,
  userName,
})

export const joinGame = (userName, gameName) => ({
  type: USER_JOIN_GAME,
  userName,
  gameName,
})

export const updateUser = data => ({
  type: USER_UPDATE,
  data,
})

export const init = () => ({
  type: USER_INIT,
})

export const updateGrid = (grid) => ({
  type: USER_UPDATE_GRID,
  grid: grid,
})

