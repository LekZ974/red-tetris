import reducer from '../../../src/client/reducers/user'
import {USER_LOGIN} from '../../../src/client/actions/user'


describe('game reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          id: '',
          userName: '',
          gameName: '',
          role: '',
          connected: false,
          payload: {}
        }
      )
    }
  )
})
