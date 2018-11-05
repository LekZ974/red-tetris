import {tetriInitNew} from "./tetrimino";

export const EMIT_GAME_STATUS = 'game/EMIT_GAME_STATUS'
export const EMIT_CREATE_GAME = 'game/EMIT_CREATE_GAME'
export const GAME_FLOW = 'game/GAME_FLOW'
export const EMIT_GAME_PIECES = 'game/EMIT_GAME_PIECES'


export const emitGameStatus = (status, game) => ({
  type: EMIT_GAME_STATUS,
  game: game,
  gameStatus: status,
})

export const emitCreateGame = (gameData) => ({
  type: EMIT_CREATE_GAME,
  game: gameData,
  thenFn: dispatch => {
    dispatch(tetriInitNew())
  }
})

export const emitGamePieces = (game) => ({
  type: EMIT_GAME_PIECES,
  game: game,
})
