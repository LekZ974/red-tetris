import {DISPLAY_COMMAND} from '../actions/alert'

export const initialState = {
  showCommand: false,
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
    case DISPLAY_COMMAND : {
      return {
        ...state,
        showCommand: !state.showCommand
      }
    }
    default:
      return state
  }
}
