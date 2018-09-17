import reducer from '../../../src/client/reducers/games'
import {GET_GAMES} from '../../../src/client/actions/games'


describe('game reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          items: [],
          isLoading: false,
        }
      )
    }
  )
  it('should handle GET_GAMES', () => {
    expect(
      reducer([],{
        type: GET_GAMES,
        payload: 'Run the tests'
      })).toEqual({"isLoading": true})
    expect(
      reducer({
          items: [],
          isLoading: false,
        }
        ,{
          type: GET_GAMES,
          payload: {'something': 'run the tests'},
          status: 'success'
        })).toEqual({
        items: {'something': 'run the tests'},
        isLoading: false,
      }
    )
    expect(
      reducer({
          items: [],
          isLoading: true,
        }
        ,{
          type: GET_GAMES,
          payload: 'a string',
          status: 'success'
        })).toEqual({
        items: 'a string',
        isLoading: false,
      }
    )
  })
})
