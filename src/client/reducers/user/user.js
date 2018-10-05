import {USER_INIT, USER_LOGIN, USER_CONNECT} from '../../actions/user'
import {GRID_HEIGHT, GRID_WIDTH} from "../../../common/grid";
import {PIECES_NUM} from "../../../common/pieces";

const initialState = {
  id: '',
  name: '',
  gameName: '',
  role: '',
  connected: false,
  grid: Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty)),
  payload: {}
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
    case USER_CONNECT : {
      return {
        ...state,
        connected: true
      }
    }
    case USER_LOGIN: {
      if (action.status === 'success') {
        const { id, name, gameName, role , connected, grid} = action.payload
        return {
          ...state,
          id,
          name,
          gameName,
          role,
          connected,
          grid
        }
      }
      return state
    }
    case USER_INIT: {
      return {
        ...state,
        connected: false
      }
    }
    default:
      return state
  }
}
