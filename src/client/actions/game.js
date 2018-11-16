export const EMIT_GAME_STATUS = 'game/EMIT_GAME_STATUS'
export const RCV_GAME_STATUS = 'game/RCV_GAME_STATUS'

export const EMIT_CREATE_GAME = 'game/EMIT_CREATE_GAME'
export const RCV_CREATE_GAME = 'game/RCV_CREATE_GAME'

export const EMIT_NEW_PIECES = 'game/EMIT_NEW_PIECES'
export const RCV_NEW_PIECES = 'game/RCV_NEW_PIECES'

export const emitGameStatus = (status, game) => ({
  type: EMIT_GAME_STATUS,
  game: game,
  gameStatus: status,
})

export const rcvGameStatus = (status, game) => ({
  type: RCV_GAME_STATUS,
  game: game,
  gameStatus: status,
})

export const emitCreateGame = gameName => ({
  type: EMIT_CREATE_GAME,
  gameName,
})

export const rcvCreateGame = (data) => ({
  type: RCV_CREATE_GAME,
  data,
})

export const emitNewPieces = (game) => ({
  type: EMIT_NEW_PIECES,
  game: game,
})

export const rcvNewPieces = data => ({
  type: RCV_NEW_PIECES,
  data,
})
