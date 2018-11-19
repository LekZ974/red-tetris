import reducer from '../../../src/client/reducers/tetrimino/tetrimino'
import {initialState} from '../../../src/client/reducers/tetrimino/tetrimino';

import {
  TETRI_STEP,
  TETRI_ACTION,
  TETRI_INIT,
  TETRI_NEW,
} from '../../../src/client/actions/tetrimino'
import {PIECES_INFO} from "../../../src/common/pieces";

describe('Test tetrimino reducer', ()=> {
  it('should render initial state when state is undefined', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })
  it('should test TETRI_STEP with no shape', ()=>{
    expect(reducer(initialState, {
      type:TETRI_STEP,
    }))
      .toEqual(
        initialState
      )
  })
  it('should test TETRI_STEP with shape', ()=>{
    const user = {
      grid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    }
    expect(reducer({
      items: [],
      id: null,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:0,
        posY:0
      },
      rotate:0,
    },{
      type:TETRI_STEP,
      user,
    }))
      .toEqual({
        items: [],
        id: null,
        pieceInfo: PIECES_INFO[5][0],
        pieceStep: 1,
        needNext:false,
        coords: {
          posX:0,
          posY:1
        },
        rotate:0,
      })
  })

  it('should test TETRI_ACTION with action keyboard is Space', ()=>{
    const action = 'Space'
    const user = {
      grid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    }
    expect(reducer({
      items: [],
      id: null,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:0,
        posY:0
      },
      rotate:0,
    },{
      type:TETRI_ACTION,
      user,
      action
    }))
      .toEqual({
        items: [],
        id: null,
        pieceInfo: PIECES_INFO[5][0],
        pieceStep: 0,
        needNext:false,
        coords: {
          posX:0,
          posY:2
        },
        rotate:0,
      })
  })

  it('should test TETRI_ACTION with action keyboard is ArrowLeft', ()=>{
    const action = 'ArrowLeft'
    const user = {
      grid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    }
    expect(reducer({
      items: [],
      id: null,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:2,
        posY:0
      },
      rotate:0,
    },{
      type:TETRI_ACTION,
      user,
      action
    }))
      .toEqual({
        items: [],
        id: null,
        pieceInfo: PIECES_INFO[5][0],
        pieceStep: 0,
        needNext:false,
        coords: {
          posX:1,
          posY:0
        },
        rotate:0,
      })
  })

  it('should test TETRI_ACTION with action keyboard is ArrowRight', ()=>{
    const action = 'ArrowRight'
    const user = {
      grid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    }
    expect(reducer({
      items: [],
      id: null,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:0,
        posY:0
      },
      rotate:0,
    },{
      type:TETRI_ACTION,
      user,
      action
    }))
      .toEqual({
        items: [],
        id: null,
        pieceInfo: PIECES_INFO[5][0],
        pieceStep: 0,
        needNext:false,
        coords: {
          posX:1,
          posY:0
        },
        rotate:0,
      })
  })

  it('should test TETRI_ACTION with action keyboard is ArrowDown', ()=>{
    const action = 'ArrowDown'
    const user = {
      grid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    }
    expect(reducer({
      items: [],
      id: null,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:0,
        posY:0
      },
      rotate:0,
    },{
      type:TETRI_ACTION,
      user,
      action
    }))
      .toEqual({
        items: [],
        id: null,
        pieceInfo: PIECES_INFO[5][0],
        pieceStep: 0,
        needNext:false,
        coords: {
          posX:0,
          posY:1
        },
        rotate:0,
      })
  })

  it('should test TETRI_ACTION with action keyboard is ArrowUp', ()=>{
    const action = 'ArrowUp'
    const user = {
      grid: [[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0],[0,0,0,0,0,0]]
    }
    expect(reducer({
      items: [],
      id: 6,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:0,
        posY:0
      },
      rotate:0,
    },{
      type:TETRI_ACTION,
      user,
      action
    }))
      .toEqual({
        items: [],
        id: 6,
        pieceInfo: PIECES_INFO[5][1],
        pieceStep: 0,
        needNext:false,
        coords: {
          posX:0,
          posY:0
        },
        rotate:1,
      })
  })

  it('should test TETRI_INIT with need next', ()=>{
    expect(reducer({
      pieceStep: 0,
      needNext:true,
      rotate:0,
    },{
      type:TETRI_INIT,
    }))
      .toEqual({
        pieceStep: 0,
        needNext:false,
        rotate:0,
      })
  })

  it('should test TETRI_NEW with need next', ()=>{
    const tetrimino = {
      items: ['TATA'],
      id: 3,
      pieceInfo: null,
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:0,
        posY:0
      },
      rotate:3,
    }
    expect(reducer(initialState,{
      type:TETRI_NEW,
      tetrimino
    }))
      .toEqual({
        items: [],
        id: 3,
        pieceInfo: PIECES_INFO[2][3],
        pieceStep: 0,
        needNext:false,
        coords: {
          posX:4,
          posY:0
        },
        rotate:3,
      })
  })
})
