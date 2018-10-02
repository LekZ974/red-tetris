import reducer from '../../../src/client/reducers/tetrimino/tetrimino'
import {TETRI_STEP} from '../../../src/client/actions/tetrimino'


describe('game reducer', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          items: [],
          pieceId: 0,
          pieceStep: 0,
          coords: {
            posX:0,
            posY:0
          },
          rotate:0,
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
      coords: {
        posX:0,
        posY:0
      },
      rotate:0,
    })
    expect(
      reducer({
          items: [],
          pieceId: 0,
          pieceStep: 4,
          coords: {
            posX:0,
            posY:0
          },
          rotate:0,
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
        coords: {
          posX:0,
          posY:1
        },
        rotate:0,
      }
    )
    expect(
      reducer({
          items: [],
          pieceId: 0,
          pieceStep: 3,
          coords: {
            posX:0,
            posY:0
          },
          rotate:0,
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
        coords: {
          posX:0,
          posY:0
        },
        rotate:0,
      }
    )
  })
})
