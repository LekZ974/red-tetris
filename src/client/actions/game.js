export const UPDATE_GAME_STATUS = 'game/UPDATE_GAME_STATUS'
export const CREATE_GAME = 'game/CREATE_GAME'
export const NEED_NEW_PIECES = 'game/NEED_NEW_PIECES'

export const updateGameStatus = (status, game) => ({
  type: UPDATE_GAME_STATUS,
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
