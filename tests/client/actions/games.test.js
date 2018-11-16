import reducer from '../../../src/client/reducers/games/games'
import * as actions from '../../../src/client/actions/games'
import{RCV_GET_GAMES, EMIT_GET_GAMES} from '../../../src/client/actions/games'

describe('get games', ()=>{
  it('should emit ', ()=>{
    expect(actions.emitGetGames()).toEqual({
      type: EMIT_GET_GAMES,
    })
  })
  it('should rcv ', ()=>{
    const games=""
    expect(actions.rcvGetGames(games)).toEqual({
      type: RCV_GET_GAMES,
      data: "",
    })
  })
})
/**
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
*/
