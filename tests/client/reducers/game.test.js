import {initialState} from '../../../src/client/reducers/game/game';
import reducer from '../../../src/client/reducers/game/game'
import {
  EMIT_CREATE_GAME,
  RCV_GAME_STATUS,
  EMIT_NEW_PIECES,
  RCV_GAME_CAN_RESTART,
  GAME_INIT_STATE,
  GAME_UPDATE,
  GAME_SOUND, GAME_INIT, RCV_GAME_IS_FINISHED, RCV_CREATE_GAME, UPDATE_PLAYERS,
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
        gameIsStarted: false,
        start: false,
        pause: false,
        params: {addMalus: true},
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
  it('should handle RCV_GAME_CAN_RESTART', () => {expect(
    reducer({
      gameIsStarted: true,
      round: 0,
    },{
      type: RCV_GAME_CAN_RESTART,
    })).toEqual({
    gameIsStarted: false,
    round: 1
    })
    expect(reducer({
        gameIsStarted: true,
        round: 3,
      }
      ,{
        type: RCV_GAME_CAN_RESTART,
      })).toEqual({
      gameIsStarted: false,
      round: 4,
    })
  })
  it('should handle GAME_INIT_STATE', () => {
    expect(reducer(initialState,{
        type: GAME_INIT_STATE,
      })).toEqual(initialState)
  })
  it('should handle GAME_UPDATE', () => {
    expect(reducer([]
      ,{
        type: GAME_UPDATE,
        data: {toto: 'a value'}
      })).toEqual({toto: 'a value'})
  })
  it('should handle GAME_SOUND', () => {
    expect(reducer(
      {
        params: {
          sound: true,
        }
      }
      ,{
        type: GAME_SOUND,
      })).toEqual(
        {
          params: {
            sound: false,
          }
        })
    expect(reducer(
      {
        params: {
          sound: false,
        }
      }
      ,{
        type: GAME_SOUND,
      })).toEqual(
      {
        params: {
          sound: true,
        }
      })
  })
  it('should handle GAME_INIT', () => {
    expect(reducer({
        gameIsStarted: true,
        isLoading: true,
        params: {
          toto: 'tata',
        },
      }
      ,{
        type: GAME_INIT,
      })).toEqual(
      {
        owner: '',
        gameIsStarted: false,
        start: false,
        pause: false,
        isLoading: false,
        params: {
          toto: 'tata',
        },
      })
  })
  it('should handle RCV_GAME_IS_FINISHED', () => {
    expect(reducer({
        gameIsStarted: true,
        isLoading: true,
        params: {
          toto: 'tata',
        },
      }
      ,{
        type: RCV_GAME_IS_FINISHED,
      })).toEqual(
      {
        gameIsStarted: false,
        start: false,
        isLoading: false,
        params: {
          toto: 'tata',
        },
      })
  })
  it('should handle RCV_CREATE_GAME', () => {
    expect(reducer({
        round: 0,
        isLoading: true,
      }
      ,{
        type: RCV_CREATE_GAME,
      })).toEqual(
      {
        round: 1,
        isLoading: false,
      })
  })
  it('should handle UPDATE_PLAYERS', () => {
    expect(reducer({
      players: 'something'
      }
      ,{
        type: UPDATE_PLAYERS,
        data: {toto: 'tutu'}
      })).toEqual(
      {
        players: {toto: 'tutu'}
      })
  })
})
