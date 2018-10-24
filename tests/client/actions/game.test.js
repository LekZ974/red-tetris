import {
  EMIT_GAME_STATUS,
  GAME_FLOW,
  EMIT_GAME_PIECES,
  EMIT_CREATE_GAME,
  gameFlow, emitGamePieces,
} from '../../../src/client/actions/game';
import reducer from '../../../src/client/reducers/game/game'
import * as actions from '../../../src/client/actions/game'
import { tetriReset } from '../../../src/client/actions/tetrimino';

const gameFlowactionReturn = (action, type) =>{
  return {
    gameAction:action,
    type:GAME_FLOW
  }
}

const emitCreateGameReturn = (game)=>{
  return {
    type: EMIT_CREATE_GAME,
    game: game,
  }
}

const emitGameStatusReturn = (status, game)=>{
  return {
    type: EMIT_GAME_STATUS,
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
          gamePieces: [],
          pause: false,
          start: false,
          id: "",
          name: "",
          owner: "",
        }
      )
    }
  )
  it('should test gameFlow  with action is an empty string', () => {
    const action = ""
    expect(actions.gameFlow(action)).toEqual(gameFlowactionReturn(action))
  })
  it('should test gameFlow with action equal test', () => {
    const action = "test"
    expect(actions.gameFlow(action)).toEqual(gameFlowactionReturn(action))
  })
  it('should test emitGamePiece', () => {
    expect(actions.emitGamePieces()).toEqual({ type: EMIT_GAME_PIECES })
  })
  it('should test emitGamePiece with no parameter pass', () => {
    const game = undefined
    expect(actions.emitCreateGame()).toEqual(emitCreateGameReturn(game))
  })
  it('should test emitGamePiece with empty string', () => {
    const game = ""
    expect(actions.emitCreateGame(game)).toEqual(emitCreateGameReturn(game))
  })
  it('should test emitGamePiece with a rubbish name', () => {
    const game = "fdklsjflms"
    expect(actions.emitCreateGame(game)).toEqual(emitCreateGameReturn(game))
  })
  it('should test emitGamePiece with "Le jeu de la vie" name', () => {
    const game = "Le jeu de la vie"
    expect(actions.emitCreateGame(game)).toEqual(emitCreateGameReturn(game))
  })
  it('should test emitGameStatus', () => {
    const status = "Pause"
    const game = {
      gameIsStarted: true,
      pause: true,
      start: false
    }
    expect(JSON.parse(JSON.stringify(actions.emitGameStatus(status, game)))).toEqual(emitGameStatusReturn(status, game))
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


  it('should handle EMIT_GAME_STATUS', () => {
    expect(
      reducer([], {
        type: EMIT_GAME_STATUS,
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
          type: EMIT_GAME_STATUS,
          gameStatus: 'Run the tests'
        })).toEqual({
        items: [],
        gameIsStarted: false,
        start: false,
        pause: false,
        gamePieces: []
      }
    )**/

