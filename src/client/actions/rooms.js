import Api from '../mock/Api'

export const ROOMS_LIST = 'rooms/ROOMS_LIST'

export const getRooms = () => ({
  type: ROOMS_LIST,
  apiCall: Api.getRooms(),
})
