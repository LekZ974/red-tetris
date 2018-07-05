import { push } from 'connected-react-router'
import { SubmissionError } from 'redux-form'

export const USER_LOGIN = 'user/LOGIN'

const initialState = {
  id: '',
  name: '',
  role: '',
}

export const login = user => ({
  type: USER_LOGIN,
  globalLoading: true,
  apiCall: () => 'is logged',
  thenFn: dispatch => {
    dispatch(push('/'))
  },
  catchFn: e => {
    throw new SubmissionError(e)
  }
})
