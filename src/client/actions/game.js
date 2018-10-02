import {tetriAction} from "./tetrimino";

export const EMIT_GAME_STATUS = 'game/EMIT_GAME_STATUS'
export const GAME_FLOW = 'game/GAME_FLOW'
export const EMIT_GAME_PIECES = 'game/EMIT_GAME_PIECES'

export const emitGameStatus = (status, game) => ({
  type: EMIT_GAME_STATUS,
  game: game,
  gameStatus: status,
  thenFn: dispatch => {
    dispatch(gameFlow(status))
    if (!game.gameIsStarted) dispatch(emitGamePieces())
  }
})

export const gameFlow = (action) => ({
  type: GAME_FLOW,
  gameAction: action,
  thenFn: dispatch => {
    dispatch(tetriAction(action))
  }
})

export const emitGamePieces = roomName => ({
  type: EMIT_GAME_PIECES,
})
