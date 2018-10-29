import Api from '../mock/Api'

export const USER_CONNECT = 'user/USER_CONNECT'
export const USER_LOGIN = 'user/USER_LOGIN'
export const USER_INIT = 'user/USER_INIT'
export const USER_UPDATE_GRID = 'user/USER_UPDATE_GRID'

export const connect = user => ({
  type: USER_CONNECT,
})
export const login = user => ({
  type: USER_LOGIN,
  user: user,
})
export const init = () => ({
  type: USER_INIT,
})
export const updateGrid = (grid) => ({
  type: USER_UPDATE_GRID,
  grid: grid,
})
