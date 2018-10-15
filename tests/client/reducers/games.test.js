import reducer from '../../../src/client/reducers/games/games'
import {initialState} from '../../../src/client/reducers/games/games';

import {
  GET_GAMES,
} from '../../../src/client/actions/game'

describe('Test game reducer', ()=> {
  it('should render initial state when state is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState)

  })
  it('should test GET_GAMES case status === success', ()=>{
    expect(reducer(initialState, {
      type:GET_GAMES,
      status:'success',
      payload:'games'
    }))
      .toEqual({
        items: [],
        isLoading: false
      })
  })
  it('should test GET_GAMES case status === connected', ()=>{
    expect(reducer({
      items: [],
      isLoading: true,
    },{
      type:GET_GAMES,
      status:'connected',
      payload: {
        games:false,
      }
    }))
      .toEqual({
        items: [],
        isLoading: true
      })
  })
 // it('should test GET_GAMES', () => {
 //      type: GET_GAMES,
 //      status:'success',
 //      payload:'fake payload'
 //    })).toEqual({
 //      items: [],
 //      isLoading: false,
 //    })
 //  })
 //  it('should test GET_GAMES', () => {
 //    expect(reducer(initialState, {
 //      type: GET_GAMES,
 //    })).toEqual({
 //      items: [],
 //      isLoading: false,
 //    })
 //  })

})
