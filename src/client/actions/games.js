export const GET_GAMES = 'games/GET_GAMES'

export const getGames = (games) => ({
  type: GET_GAMES,
  payload: games,
  status:'success'
})
