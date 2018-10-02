import reducer from '../../../src/client/reducers/game/game'
import {EMIT_GAME_STATUS, GAME_FLOW, EMIT_GAME_PIECES} from '../../../src/client/actions/game'


describe('game reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
      )
    }
  )
  it('should handle EMIT_GAME_STATUS', () => {
    expect(
      reducer([],{
        type: EMIT_GAME_STATUS,
        gameStatus: 'Run the tests'
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
          type: EMIT_GAME_STATUS,
          gameStatus: 'Run the tests'
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )
    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        ,{
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
    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        ,{
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
    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        ,{
          type: EMIT_GAME_STATUS,
          gameStatus: 'Stop'
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )
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
      reducer([],{
        type: GAME_FLOW,
        gameAction: 'something'
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
})
