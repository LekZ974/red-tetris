import reducer from '../../../src/client/reducers/user/user'


describe('game reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          id: '',
          userName: '',
          gameName: '',
          role: '',
          connected: false,
          grid: [],
          payload: {}
        }
      )
    }
  )
})