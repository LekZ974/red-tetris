import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

export const USER_CONNECT = 'user/USER_CONNECT'

export const EMIT_USER_LOGIN = 'user/EMIT_USER_LOGIN'
export const RCV_USER_LOGIN = 'user/RCV_USER_LOGIN'

export const EMIT_USER_LEAVE_GAME = 'user/EMIT_USER_LEAVE_GAME'
export const RCV_USER_LEAVE_GAME = 'user/RCV_USER_LEAVE_GAME'

export const EMIT_USER_JOIN_GAME = 'user/EMIT_USER_JOIN_GAME'
export const RCV_USER_JOIN_GAME = 'user/RCV_USER_JOIN_GAME'

export const EMIT_USER_LOST = 'user/EMIT_USER_LOST'

export const USER_INIT = 'user/USER_INIT'
export const USER_UPDATE = 'user/USER_UPDATE'
export const USER_UPDATE_GRID = 'user/USER_UPDATE_GRID'

export const connect = user => ({
  type: USER_CONNECT,
})

export const emitLogin = userName => ({
  type: EMIT_USER_LOGIN,
  userName,
})

export const rcvLogin = data => ({
  type: RCV_USER_LOGIN,
  data
})

export const emitJoinGame = (userName, gameName) => ({
  type: EMIT_USER_JOIN_GAME,
  userName,
  gameName,
})

export const rcvJoinGame = data => ({
  type: RCV_USER_JOIN_GAME,
  data,
})

export const emitLeaveGame = () => ({
  type: EMIT_USER_LEAVE_GAME,
})

export const rcvLeaveGame = data => ({
  type: RCV_USER_LEAVE_GAME,
  data,
})

export const emitUserLost = () => ({
  type: EMIT_USER_LOST
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

