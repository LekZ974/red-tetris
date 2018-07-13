import {GET_ROOMS, getRooms} from "../actions/rooms";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
    socket.on('message', function(message) {
      alert('Le serveur a un message pour vous : ' + message);
    })
  }
  return next => action => {
    if (socket) {
      console.log("SOCKET ACTION", action)
      switch (action.type) {
        case GET_ROOMS : {
          socket.on('GET_ROOMS', (payload) => {
            console.log("SOCKET PAYLOAD",payload)
            console.log("SOCKET type", action.type)
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
        }
      }
    }
  }
}

export default socketMiddleware
