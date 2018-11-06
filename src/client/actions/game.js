export const EMIT_GAME_STATUS = 'game/EMIT_GAME_STATUS'
export const CREATE_GAME = 'game/CREATE_GAME'
export const GAME_FLOW = 'game/GAME_FLOW'
export const NEED_NEW_PIECES = 'game/NEED_NEW_PIECES'
export const EMIT_UPDATE_GRID = 'game/EMIT_UPDATE_GRID'


export const emitGameStatus = (status, game) => ({
  type: EMIT_GAME_STATUS,
  game: game,
  gameStatus: status,
})

export const createGame = gameName => ({
  type: CREATE_GAME,
  gameName,
})

export const needNewPieces = (game) => ({
  type: NEED_NEW_PIECES,
  game: game,
})

export const emitUpdateGrid = grid => ({
  type: EMIT_UPDATE_GRID,
  grid: grid,
})
