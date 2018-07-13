import {GET_ROOMS, getRooms} from "../actions/rooms";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    if (socket && action.type === GET_ROOMS) {
      console.log("SOCKETIO")
      dispatch(getRooms)
    }
    return next(action)
  }
}

export default socketMiddleware
