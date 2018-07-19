import { push } from 'connected-react-router'
import { SubmissionError } from 'redux-form'
import Api from '../mock/Api'

export const USER_LOGIN = 'user/USER_LOGIN'

export const login = user => ({
  type: USER_LOGIN,
  apiCall: Api.login(user),
  thenFn: dispatch => dispatch(push(`/#${user.game}/${user.name}`)),
  catchFn: e => {
    console.log(e)
    throw new SubmissionError(e)
  }
})
