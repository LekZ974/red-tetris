import {initialState} from '../../../src/client/reducers/game/game';
import reducer from '../../../src/client/reducers/game/game'
import {
  EMIT_CREATE_GAME,
  RCV_GAME_STATUS,
  EMIT_NEW_PIECES,
} from '../../../src/client/actions/game'

describe('Test game reducer', ()=> {
  it('should render initial state when state is undifined', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should render initial state when action is not pass', () => {
    expect(reducer(initialState, {})).toEqual(initialState)
  })

  it('should test CREATE_GAME', () => {
    const  name = "Kirikou"
    expect(reducer({
      items: [],
      name: '',
      id: '',
      owner: "",
      gameIsStarted: false,
      start: false,
      pause: false,
      gamePieces: [],
      isLoading: false,
    }, {
      type: EMIT_CREATE_GAME,
      gameName: name,
    })).toEqual({
      items: [],
      name: name,
      id: '',
      owner: "",
      gameIsStarted: false,
      start: false,
      pause: false,
      gamePieces: [],
      isLoading: true,
    })
  })
  it('should test UPDATE_GAME_STATUS', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
        }
        , {
          type: RCV_GAME_STATUS,
          gameStatus: 'Start'
        })).toEqual({
        items: [],
        gameIsStarted: true,
        start: true,
        pause: false,
      }
    )
  })
  it('should test UPDATE_GAME_STATUS default case', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
        }
        , {
          type: RCV_GAME_STATUS,
          gameStatus: 'rien'
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
      }
    )
  })
  it('should test UPDATE_GAME_STATUS', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
        }
        , {
          type: RCV_GAME_STATUS,
          gameStatus: 'Pause'
        })).toEqual({
        items: [],
        gameIsStarted: true,
        start: false,
        pause: true,
      }
    )
  })
  it('should test Alex UPDATE_GAME_STATUS', () => {

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          params: {addMalus: true}
        }
        , {
          type: RCV_GAME_STATUS,
          gameStatus: 'Stop'
        })).toEqual({
        items: [],
        id:"",
        owner:"",
        name:"",
        gameIsStarted: false,
        start: false,
        pause: false,
        params: {addMalus: true},
        isLoading: false,
      }
    )
  })
  it('should handle NEED_NEW_PIECES', () => {expect(
    reducer([],{
      type: EMIT_NEW_PIECES,
    })).toEqual([])
    expect(reducer({
      items: [],
      gameIsStarted: false,
      start: false,
      pause: false,
    }
    ,{
      type: EMIT_NEW_PIECES,
    })).toEqual({
      items: [],
      gameIsStarted: false,
      start: false,
      pause: false,
    })
  })
})
