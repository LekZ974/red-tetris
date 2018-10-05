import {GRID_HEIGHT, GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

class ApiMock {
  login(data) {
    let player = {
      id: Math.random().toString(36).substring(2, 15),
      name: data.userName,
      gameName: data.gameName,
      connected: true,
      role: 'master',
      grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
    }
    if (player.name && player.gameName) {
      return Promise.resolve({status: 200, ...player})
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
