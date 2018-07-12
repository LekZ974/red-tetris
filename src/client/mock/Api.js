import {push} from "connected-react-router";
import {SubmissionError} from "redux-form";

class ApiMock {
  login(user) {
    let data = {
      id: Math.random().toString(36).substring(2, 15),
      userName: user.name,
      roomName: user.room,
      connected: true,
      role: 'master',
      thenFn: dispatch => {dispatch(push(`/#${user.room}/${user.name}`))},
      catchFn: e => {
        throw new SubmissionError(e)
      }
    }
    if (data.userName && data.roomName) {
      return Promise.resolve({status: 200, ...data})
        .catch(error => {
          reject({ _error: error.message })
        })
    }
    return Promise.reject({status: 404})
      .catch(error => {
        reject({ _error: error.message })
      })

  }
  getRooms() {
    return Promise.resolve({
      status: 200, rooms: [
        {
          id: 1,
          name: 'Party1',
          owner: 'Alex'
        },
        {
          id: 2,
          name: 'Party2',
          owner: 'TOTO'
        },
        {
          id: 3,
          name: 'Party3',
          owner: 'TUTU'
        },
        {
          id: 4,
          name: 'PartyA',
          owner: 'Alex'
        },
        {
          id: 5,
          name: 'PartyB',
          owner: 'TOTO'
        },
        {
          id: 6,
          name: 'PartyC',
          owner: 'TUTU'
        },
      ]
    })
  }
}
export default new ApiMock()
