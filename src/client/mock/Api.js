import {push} from "connected-react-router";
import {SubmissionError} from "redux-form";

class ApiMock {
  login(user) {
    let data = {
      id: Math.random().toString(36).substring(2, 15),
      userName: user.name,
      gameName: user.game,
      connected: true,
      role: 'master',
      thenFn: dispatch => {dispatch(push(`/#${user.game}/${user.name}`))},
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
}
export default new ApiMock()
