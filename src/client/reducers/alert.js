import {ALERT_INIT, DISPLAY_COMMAND, DISPLAY_CONFIG_FORM, DISPLAY_RESULT} from '../actions/alert'

export const initialState = {
  showCommand: false,
  showConfigForm: true,
  showResult: true,
}

export default function UserReducer (state = initialState, action = {}) {

  switch (action.type) {
    case DISPLAY_COMMAND : {
      return {
        ...state,
        showCommand: !state.showCommand
      }
    }
    case DISPLAY_CONFIG_FORM : {
      return {
        ...state,
        showConfigForm: !state.showConfigForm,
      }
    }
    case DISPLAY_RESULT : {
      return {
        ...state,
        showResult: !state.showResult,
      }
    }
    case ALERT_INIT : {
      return initialState
    }
    default:
      return state
  }
}
