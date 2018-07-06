import { push } from 'connected-react-router'
import { SubmissionError } from 'redux-form'
import Api from '../mock/Api'

export const USER_LOGIN = 'user/LOGIN'

export const login = user => ({
  type: USER_LOGIN,
  globalLoading: false,
  apiCall: Api.login(user),
  thenFn: dispatch => {
    dispatch(push(`/#${user.room}/${user.name}`))
  },
  catchFn: e => {
    throw new SubmissionError(e)
  }
})
