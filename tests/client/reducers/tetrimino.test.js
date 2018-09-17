import reducer from '../../../src/client/reducers/tetrimino'
import {TETRI_STEP} from '../../../src/client/actions/tetrimino'


describe('game reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          items: [],
          pieceId: 0,
          pieceStep: 0,
        }
      )
    }
  )
  it('should handle TETRI_STEP', () => {
    expect(
      reducer([],{
        type: TETRI_STEP,
        game: 'something with game data'
      })).toEqual({
      items: [],
      pieceId: 0,
      pieceStep: 0,
    })
    expect(
      reducer({
          items: [],
          pieceId: 0,
          pieceStep: 4,
        }
        ,{
          type: TETRI_STEP,
          game: {
            gameIsStarted: true
          }
        })).toEqual({
        items: [],
        pieceId: 0,
        pieceStep: 5,
      }
    )
    expect(
      reducer({
          items: [],
          pieceId: 0,
          pieceStep: 3,
        }
        ,{
          type: TETRI_STEP,
          game: {
            gameIsStarted: false
          }
        })).toEqual({
        items: [],
        pieceId: 0,
        pieceStep: 0,
      }
    )
  })
})
