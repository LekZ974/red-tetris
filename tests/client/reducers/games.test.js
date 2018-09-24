import reducer from '../../../src/client/reducers/games/games'
import {GET_GAMES} from '../../../src/client/actions/games'
import {reducerGetGames} from '../../../src/client/reducers/games/functions'


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
      })).toEqual(reducerGetGames)
    expect(
      reducer({
          items: [],
          isLoading: false,
        }
        ,{
          type: GET_GAMES,
          payload: {'something': 'run the tests'},
          status: 'success'
        })).toEqual(reducerGetGames)
    expect(
      reducer({
          items: [],
          isLoading: true,
        }
        ,{
          type: GET_GAMES,
          payload: 'a string',
          status: 'success'
        })).toEqual(reducerGetGames)
  })
})
