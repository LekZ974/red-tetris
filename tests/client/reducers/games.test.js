import reducer from '../../../src/client/reducers/games/games'
import {initialState} from '../../../src/client/reducers/games/games';

import {
  EMIT_GET_GAMES,
  RCV_GET_GAMES,
} from '../../../src/client/actions/games'

describe('Test games reducer', ()=> {
  it('should render initial state when state is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState)

  })
  it('should test EMIT_GET_GAMES', ()=>{
    expect(reducer(initialState, {
      type:EMIT_GET_GAMES,
    }))
      .toEqual({
        items: [],
        isLoading: true
      })
  })
  it('should test RCV_GET_GAMES', ()=>{
    expect(reducer({
      items: [],
      isLoading: true,
    },{
      type:RCV_GET_GAMES,
      data: 'some data'
    }))
      .toEqual({
        items: 'some data',
        isLoading: false
      })
  })
})
