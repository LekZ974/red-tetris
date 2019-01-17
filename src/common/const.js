export const SPEED_MODE = {
  easy: 'EASY_MODE',
  medium: 'MEDIUM_MODE',
  hard: 'HARD_MODE',
  noSpeed: 'NO_SPEED',
}

export const GAME_MODE = {
  solo: 'SOLO',
  multi: 'MULTI',
}

export const MALUS_MODE = {
  malus: 'MALUS',
  noMalus: 'NO_MALUS',
}

export const USER_ROLE = {
  master: 'master',
  challenger: 'challenger'
}

export const KEYBOARD_ACTION = {
  space: 'Space',
  left: 'ArrowLeft',
  right: 'ArrowRight',
  up: 'ArrowUp',
  down: 'ArrowDown',
}

export const GAME_STATUS = {
  start: 'Start',
  restart: 'Restart',
  stop: 'Stop',
  pause: 'Pause',
}

export const TYPE_MESSAGE = {
  info: 'info',
  warning: 'warning',
  error: 'error',
  success: 'success'
}

export const SOCKET = {
  LOGIN: 'login',
  LOGGED: 'logged',
  GET_GAMES: 'getGames',
  GAMES_SENT: 'gamesSent',
  CREATE_GAME: 'createGame',
  GAME_EXISTS: 'gameExists',
  JOIN_GAME: 'joinGame',
  GAME_JOINED: 'gameJoined',
  REQUEST_SHAPE: 'requestShape',
  EMITTED_SHAPE: 'emittedShape',
  START_GAME: 'startGame',
  GAME_STARTED: 'gameStarted',
  LEAVE_GAME: 'leaveGame',
  LEFT_GAME: 'leftGame',
  CAN_START: 'canStart',
  UPDATE_BOARD: 'updateBoard',
  BOARD_UPDATED: 'boardUpdated',
  UPDATE_STATUS: 'updateStatus',
  SPECTRES_UPDATED: 'spectresUpdated',
  ALL_PLAYERS: 'allPlayers',
  GAME_FINISHED: 'gameFinished',
  RESTART_GAME: 'restartGame',
  CAN_RESTART: 'canRestart',
  MALUS_UPDATED: 'malusUpdated',
  SOMEONE_JOINED: 'someoneJoined',
  SOMEONE_LEFT: 'someoneLeft',
  SCORE_UPDATED: 'scoreUpdated'
}
