export const EMIT_GAME_STATUS = 'game/EMIT_GAME_STATUS'
export const RCV_GAME_STATUS = 'game/RCV_GAME_STATUS'

export const EMIT_CREATE_GAME = 'game/EMIT_CREATE_GAME'
export const RCV_CREATE_GAME = 'game/RCV_CREATE_GAME'

export const EMIT_NEW_PIECES = 'game/EMIT_NEW_PIECES'
export const RCV_NEW_PIECES = 'game/RCV_NEW_PIECES'

export const UPDATE_PLAYERS = 'game/UPDATE_PLAYERS'

export const RCV_GAME_IS_FINISHED = 'game/RCV_GAME_IS_FINISHED'

export const emitGameStatus = (status, game) => ({
  type: EMIT_GAME_STATUS,
  game: game,
  gameStatus: status,
})

export const rcvGameStatus = (status) => ({
  type: RCV_GAME_STATUS,
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

export const updatePlayers = data => ({
  type: UPDATE_PLAYERS,
  data,
})

export const rcvGameIsFinished = data => ({
  type: RCV_GAME_IS_FINISHED,
  data,
})
