export const EMIT_GET_GAMES = 'games/EMIT_GET_GAMES'
export const RCV_GET_GAMES = 'games/RCV_GET_GAMES'

export const emitGetGames = () => ({
  type: EMIT_GET_GAMES,
})

export const rcvGetGames = data => ({
  type: RCV_GET_GAMES,
  data,
})
