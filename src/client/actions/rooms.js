import Api from '../mock/Api'

export const GET_ROOMS = 'rooms/GET_ROOMS'

export const getRooms = (rooms) => ({
  type: GET_ROOMS,
  payload: rooms,
})
