import {push} from "connected-react-router";
import {SubmissionError} from "redux-form";

class ApiMock {
  login(user) {
    let data = {
      id: Math.random().toString(36).substring(2, 15),
      userName: user.userName,
      gameName: user.gameName,
      connected: true,
      role: 'master',
    }
    if (data.userName && data.gameName) {
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
