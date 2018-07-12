import Api from '../mock/Api'

export const GET_ROOMS = 'rooms/GET_ROOMS'

export const getRooms = () => ({
  type: GET_ROOMS,
  apiCall: Api.getRooms(),
})
