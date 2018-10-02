import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

class ApiMock {
  login(user) {
    let data = {
      id: Math.random().toString(36).substring(2, 15),
      userName: user.userName,
      gameName: user.gameName,
      connected: true,
      role: 'master',
      grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
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
