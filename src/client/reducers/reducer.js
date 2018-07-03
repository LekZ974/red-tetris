import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import alert from './alert'

const appReducer = combineReducers({
  alert,
  form: formReducer
})

const rootReducer = (state, action) => {

  return appReducer(state, action)
}

export default rootReducer
