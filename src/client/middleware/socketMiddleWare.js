import {GET_ROOMS, getRooms} from "../actions/rooms";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    if (socket) {
      switch (action.type) {
        case GET_ROOMS : {
          socket.on('GET_ROOMS', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
        }
      }
    }
  }
}

export default socketMiddleware
