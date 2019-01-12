export const EMIT_GAME_STATUS = 'game/EMIT_GAME_STATUS'
export const RCV_GAME_STATUS = 'game/RCV_GAME_STATUS'

export const EMIT_CREATE_GAME = 'game/EMIT_CREATE_GAME'
export const RCV_CREATE_GAME = 'game/RCV_CREATE_GAME'

export const EMIT_NEW_PIECES = 'game/EMIT_NEW_PIECES'
export const RCV_NEW_PIECES = 'game/RCV_NEW_PIECES'

export const UPDATE_PLAYERS = 'game/UPDATE_PLAYERS'

export const RCV_GAME_IS_FINISHED = 'game/RCV_GAME_IS_FINISHED'

export const RCV_GAME_CAN_RESTART = 'game/RCV_GAME_CAN_RESTART'

export const GAME_INIT_STATE = 'game/GAME_INIT_STATE'

export const GAME_INIT = 'game/GAME_INIT'

export const GAME_UPDATE = 'game/GAME_UPDATE'

export const GAME_SOUND = 'game/GAME_SOUND'

export const GAME_SOMEONE_JOINED = 'game/GAME_SOMEONE_JOINED'

export const GAME_SOMEONE_LEFT = 'game/GAME_SOMEONE_LEFT'

export const emitGameStatus = (status, game) => ({
  type: EMIT_GAME_STATUS,
  game: game,
  gameStatus: status,
})

export const rcvGameStatus = (status) => ({
  type: RCV_GAME_STATUS,
  gameStatus: status,
})

export const emitCreateGame = (gameName, isSolo) => ({
  type: EMIT_CREATE_GAME,
  gameName,
  isSolo,
})

export const rcvCreateGame = (data) => ({
  type: RCV_CREATE_GAME,
  data,
})

export const emitNewPieces = () => ({
  type: EMIT_NEW_PIECES,
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

export const rcvGameCanRestart = data => ({
  type: RCV_GAME_CAN_RESTART,
  data,
})

export const gameInitState = () => ({
  type: GAME_INIT_STATE,
})

export const gameInit = () => ({
  type: GAME_INIT,
})

export const updateGame = data => ({
  type: GAME_UPDATE,
  data,
})

export const gameSound = data => ({
  type: GAME_SOUND,
  data,
})

export const someoneIsJoined = data => ({
  type: GAME_SOMEONE_JOINED,
  data,
})

export const someoneIsLeft = data => ({
  type: GAME_SOMEONE_LEFT,
  data,
})
