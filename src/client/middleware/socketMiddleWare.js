import {GET_GAMES} from "../actions/games";

const socketMiddleware = socket => ({dispatch}) => {
  if(socket) {
    socket.on('action', dispatch)
  }
  return next => action => {
    if (socket) {
      switch (action.type) {
        case GET_GAMES : {
          socket.on('GET_GAMES', (payload) => {
            return payload ? next({payload, type: action.type, status: 'success'}) : next(action)
          })
        }
      }
    }
  }
}

export default socketMiddleware
