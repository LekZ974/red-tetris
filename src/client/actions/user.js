import { push } from 'connected-react-router'
import { SubmissionError } from 'redux-form'

export const USER_SIGN_UP = 'user/SIGN_UP'
export const USER_LOGIN = 'user/LOGIN'

const initialState = {
  id: '',
  name: '',
  role: '',
}

export const signUp = user => ({
  type: USER_SIGN_UP,
  globalLoading: true,
  apiCall: Api.signUp(user),
  catchFn: e => {
    throw new SubmissionError({
      _error: e.message && e.message,
      ...e
    })
  }
})

export const login = user => ({
  type: USER_LOGIN,
  globalLoading: true,
  apiCall: Api.login(user),
  thenFn: dispatch => {
    dispatch(push('/'))
  },
  catchFn: e => {
    throw new SubmissionError(e)
  }
})
