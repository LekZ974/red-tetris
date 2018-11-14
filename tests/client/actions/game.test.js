import {
  NEED_NEW_PIECES,
  CREATE_GAME,
  UPDATE_GAME_STATUS,
} from '../../../src/client/actions/game';
import reducer from '../../../src/client/reducers/game/game'
import * as actions from '../../../src/client/actions/game'
import { tetriReset } from '../../../src/client/actions/tetrimino';

const emitCreateGameReturn = gameName =>{
  return {
    type: CREATE_GAME,
    gameName: gameName,
  }
}

const emitGameStatusReturn = (status, game)=>{
  return {
    type: UPDATE_GAME_STATUS,
    game: game,
    gameStatus: status,
  }
}

describe('game test all actions', () => {
  it('should return the initial state', () => {
      expect(reducer(undefined, {})).toEqual(
        {
          items: [],
          gameIsStarted: false,
          pause: false,
          start: false,
          id: "",
          name: "",
          owner: "",
        }
      )
    }
  )
  it('should test NeedNewPiece', () => {
    expect(actions.needNewPieces({})).toEqual({ type: NEED_NEW_PIECES, game: {} })
  })
  it('should test emitGamePiece with no parameter pass', () => {
    const gameName = undefined
    expect(actions.createGame()).toEqual(emitCreateGameReturn(gameName))
  })
  it('should test emitGamePiece with empty string', () => {
    const gameName = ""
    expect(actions.createGame(gameName)).toEqual(emitCreateGameReturn(gameName))
  })
  it('should test emitGamePiece with a rubbish name', () => {
    const gameName = "fdklsjflms"
    expect(actions.createGame(gameName)).toEqual(emitCreateGameReturn(gameName))
  })
  it('should test emitGamePiece with "Le jeu de la vie" name', () => {
    const gameName = "Le jeu de la vie"
    expect(actions.createGame(gameName)).toEqual(emitCreateGameReturn(gameName))
  })
  it('should test emitGameStatus', () => {
    const status = "Pause"
    const game = {
      gameIsStarted: true,
      pause: true,
      start: false
    }
    expect(JSON.parse(JSON.stringify(actions.updateGameStatus(status, game)))).toEqual(emitGameStatusReturn(status, game))
  })
})
   /** const game ={
      gameIsStarted:false,
      start:true,
      pause:true
    }
    const testIfCondition = game.gameIsStarted ? test.skip : test;

    testIfCondition('Only test on condition', () => {

   })


  it('should handle UPDATE_GAME_STATUS', () => {
    expect(
      reducer([], {
        type: UPDATE_GAME_STATUS,
        gameStatus: 'Run the tests'
      })).toEqual([])
  })

    expect(
      reducer({
          items: [],
          gameIsStarted: false,
          start: false,
          pause: false,
          gamePieces: []
        }
        ,{
          type: UPDATE_GAME_STATUS,
          gameStatus: 'Run the tests'
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )**/

