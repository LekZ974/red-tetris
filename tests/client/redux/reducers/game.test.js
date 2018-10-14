import {initialState} from '../../../../src/client/reducers/game/game';
import reducer from '../../../../src/client/reducers/game/game'
import {
  EMIT_GAME_STATUS,
  GAME_FLOW,
  EMIT_GAME_PIECES,
  EMIT_CREATE_GAME
} from '../../../../src/client/actions/game'

describe('Test game reducer', ()=> {
  it('should render initial state when state is undifined', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should render initial state when action is not pass', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })
  it('should test EMIT_CREATE_GAME', () => {
    const  name = "Kirikou"
    const owner = "Moi"
    expect(reducer({
      items: [],
      name: '',
      id: '',
      owner: undefined,
      gameIsStarted: false,
      start: false,
      pause: false,
      gamePieces: []
    }, {
      type: EMIT_CREATE_GAME,
      game: {
        gameName:name,
        userName:owner
      }
    })).toEqual({
      items: [],
      name: name,
      id: '',
      owner: owner,
      gameIsStarted: false,
      start: false,
      pause: false,
      gamePieces: []
    })
  })
  it('should test EMIT_GAME_STATUS', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        , {
          type: EMIT_GAME_STATUS,
          gameStatus: 'Start'
        })).toEqual({
        items: [],
        gameIsStarted: true,
        start: true,
        pause: false,
        gamePieces: []
      }
    )
  })
  it('should test EMIT_GAME_STATUS default case', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        , {
          type: EMIT_GAME_STATUS,
          gameStatus: 'rien'
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )
  })
  it('should test EMIT_GAME_STATUS', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        , {
          type: EMIT_GAME_STATUS,
          gameStatus: 'Pause'
        })).toEqual({
        items: [],
        gameIsStarted: true,
        start: false,
        pause: true,
        gamePieces: []
      }
    )
  })
  it('should test Alex EMIT_GAME_STATUS', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        , {
          type: EMIT_GAME_STATUS,
          gameStatus: 'Stop'
        })).toEqual({
        items: [],
        id:"",
        owner:"",
        name:"",
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )
  })
})
     it('should handle EMIT_GAME_PIECES', () => {
    expect(
      reducer([],{
        type: EMIT_GAME_PIECES,
      })).toEqual([])
    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        ,{
          type: EMIT_GAME_PIECES,
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )
  })
     it('should handle GAME_FLOW', () => {
       expect(
         reducer([], {
           type: GAME_FLOW,
           gameAction: 'something'
         })).toEqual([])
     })
       it('should handle GAME_FLOW', () => {

         expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        ,{
          type: GAME_FLOW,
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )

})
