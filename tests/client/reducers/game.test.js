import {initialState} from '../../../src/client/reducers/game/game';
import reducer from '../../../src/client/reducers/game/game'
import {
  UPDATE_GAME_STATUS,
  CREATE_GAME,
  NEED_NEW_PIECES,
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
      gamePieces: []
    }, {
      type: CREATE_GAME,
      gameName: name,
    })).toEqual({
      items: [],
      name: name,
      id: '',
      owner: "",
      gameIsStarted: false,
      start: false,
      pause: false,
      gamePieces: []
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
          type: UPDATE_GAME_STATUS,
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
          type: UPDATE_GAME_STATUS,
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
          type: UPDATE_GAME_STATUS,
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
          type: UPDATE_GAME_STATUS,
          gameStatus: 'Stop'
        })).toEqual({
        items: [],
        id:"",
        owner:"",
        name:"",
        gameIsStarted: false,
        start: false,
        pause: false,
        params: {addMalus: true}
      }
    )
  })
  it('should handle NEED_NEW_PIECES', () => {expect(
    reducer([],{
      type: NEED_NEW_PIECES,
    })).toEqual({})
    expect(reducer({
      items: [],
      gameIsStarted: false,
      start: false,
      pause: false,
    }
    ,{
      type: NEED_NEW_PIECES,
    })).toEqual({
      items: [],
      gameIsStarted: false,
      start: false,
      pause: false,
    })
  })
})
