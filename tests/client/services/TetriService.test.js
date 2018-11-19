import React from 'react';
import { expect } from 'chai'
import {
  hasCollision,
  placePiece,
  placePiecePreview,
  newRot,
  finalPos,
  newCoords,
  updatePieceRot,
  updateTetriPos,
  cloneTetri,
  gridDelLine,
  asLoose,
  addMalusBlocks,
} from '../../../src/client/services/TetriService';
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {PIECES_NUM, PIECES_ACTION, PIECES_INFO, PRIO_COLLISION, COLLISION_TYPE} from "../../../src/common/pieces";

describe('>>>>>TetriService', () => {
  describe('>>>>>hasCollision', () => {
    it('have not collision', () => {
      const grid = [];
      const piece = [];
      const coords = {posX: '0', posY: 0}
      expect(hasCollision(grid, piece, coords)).to.equal(undefined)
    })
    it('Piece at 0,0', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      const coords = {posX: 0, posY: 0}
      PIECES_INFO.map(PIECE_INFO => {
        PIECE_INFO.map(ROT_PIECE => {
          expect(hasCollision(grid, ROT_PIECE.piece, coords)).to.equal(undefined)
        })
      })
    })
    it('Limit RIGHT 10,0', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      const coords = {posX: 10, posY: 0}
      PIECES_INFO.map(PIECE_INFO => {
        PIECE_INFO.map(ROT_PIECE => {
          expect(hasCollision(grid, ROT_PIECE.piece, coords)).to.equal("collision_limit_right")
        })
      })
    })
    it('Limit Down 15,23', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      const coords = {posX: 15, posY: 23}
      PIECES_INFO.map(PIECE_INFO => {
        PIECE_INFO.map(ROT_PIECE => {
          expect(hasCollision(grid, ROT_PIECE.piece, coords)).to.equal("collision_limit_down")
        })
      })
    })
    it('Limit Left -4,15', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      const coords = {posX: -4, posY: 15}
      PIECES_INFO.map(PIECE_INFO => {
        PIECE_INFO.map(ROT_PIECE => {
          expect(hasCollision(grid, ROT_PIECE.piece, coords)).to.equal("collision_limit_left")
        })
      })
    })
    it('Limit Top 6,-3', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      const coords = {posX: 6, posY: -3}
      PIECES_INFO.map(PIECE_INFO => {
        PIECE_INFO.map(ROT_PIECE => {
          expect(hasCollision(grid, ROT_PIECE.piece, coords)).to.equal("collision_limit_top")
        })
      })
    })
    it('Limit Piece', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM._1));
      const coords = {posX: 6, posY: 5}
      PIECES_INFO.map(PIECE_INFO => {
        PIECE_INFO.map(ROT_PIECE => {
          expect(hasCollision(grid, ROT_PIECE.piece, coords)).to.equal("collision_piece")
        })
      })
    })
  })
  describe('>>>>>placePiece', () => {
    it('place Piece 0,0', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[5][3],
        pieceStep: 0,
        collision: false,
        coords: {
          posX:0,
          posY:0
        },
        action: null,
        rotate:0,
      }
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      expect(JSON.stringify(placePiece(grid, tetrimino))).to.equal(JSON.stringify([
        [0, 6, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 6, 0, 0, 0, 0, 0, 0, 0, 0],
        [6, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
    it('place Piece 4,7', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[2][0],
        pieceStep: 8,
        collision: false,
        coords: {
          posX:4,
          posY:7
        },
        action: null,
        rotate:0,
      }
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      expect(JSON.stringify(placePiece(grid, tetrimino))).to.equal(JSON.stringify([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 3, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 3, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
    it('place Piece output', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[4][0],
        pieceStep: 8,
        collision: false,
        coords: {
          posX:14,
          posY:21
        },
        action: null,
        rotate:0,
      }
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      expect(JSON.stringify(placePiece(grid, tetrimino))).to.equal(JSON.stringify([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
  })
  describe('>>>>>placePiecePreview', () => {
    it('place Piece 0,0', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[0][3],
        pieceStep: 0,
        collision: false,
        coords: {
          posX:0,
          posY:0
        },
        action: null,
        rotate:0,
      }
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      expect(JSON.stringify(placePiecePreview(grid, tetrimino))).to.equal(JSON.stringify([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 8, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
    it('place Piece 4,7', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[6][0],
        pieceStep: 8,
        collision: false,
        coords: {
          posX:4,
          posY:7
        },
        action: null,
        rotate:0,
      }
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      expect(JSON.stringify(placePiecePreview(grid, tetrimino))).to.equal(JSON.stringify([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 8, 8, 0, 0, 0],
        [0, 0, 0, 0, 8, 8, 0, 0, 0, 0]
      ]))
    })
    it('place Piece output', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[4][0],
        pieceStep: 8,
        collision: false,
        coords: {
          posX:14,
          posY:21
        },
        action: null,
        rotate:0,
      }
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      expect(JSON.stringify(placePiecePreview(grid, tetrimino))).to.equal(JSON.stringify([
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
  })
  describe('>>>>>finalPos', () => {
    it('with a valid grid', () => {
      expect(JSON.stringify(finalPos([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]], [[1,1,1]], {posX:0, posY:0}))).to.equal(JSON.stringify({posX:0, posY:4}))
    })
    it('with an obstacle', () => {
      expect(JSON.stringify(finalPos([[0,0,0,0,0],[0,0,0,0,0],[2,2,2,2,0],[0,0,0,0,0],[0,0,0,0,0]], [[1,1,1]], {posX:0, posY:0}))).to.equal(JSON.stringify({posX:0, posY:1}))
    })
  })

  describe('>>>>>newRot', () => {
    it('rotate to right', () => {
      expect(newRot(0, PIECES_ACTION.ROTATE_RIGHT)).to.equal(1)
    })
    it('rotate to left', () => {
      expect(newRot(0, PIECES_ACTION.ROTATE_LEFT)).to.equal(3)
    })
  })

  describe('>>>>>newCoords', () => {
    it('move down', () => {
      expect(JSON.stringify(newCoords({posX:5, posY:10}, PIECES_ACTION.MOVE_DOWN))).to.equal(JSON.stringify({posX:5, posY:11}))
    })
    it('move left', () => {
      expect(JSON.stringify(newCoords({posX:3, posY:7}, PIECES_ACTION.MOVE_LEFT))).to.equal(JSON.stringify({posX:2, posY:7}))
    })
    it('move right', () => {
      expect(JSON.stringify(newCoords({posX:12, posY:14}, PIECES_ACTION.MOVE_RIGHT))).to.equal(JSON.stringify({posX:13, posY:14}))
    })
    it('move is invalid', () => {
      expect(JSON.stringify(newCoords({posX:11, posY:12}, "An invalid movement"))).to.equal(JSON.stringify({posX:11, posY:12}))
    })
  })

  describe('>>>>>updatePieceRot', () => {
    const grid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    const gridWithObstacle = [[0,0,0,0,0],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

    const tetrimino = {
      id: 4,
      pieceInfo: PIECES_INFO[3][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:1,
        posY:0
      },
      action: null,
      rotate:0,
    }

    it('rotate right', () => {
      expect(JSON.stringify(updatePieceRot(grid, tetrimino, PIECES_ACTION.ROTATE_RIGHT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[3][1], coords: {posX:1, posY: 0}, rotate: 1}))
    })
    it('rotate left', () => {
      expect(JSON.stringify(updatePieceRot(grid, tetrimino, PIECES_ACTION.ROTATE_LEFT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[3][3], coords: {posX:1, posY: 0}, rotate: 3}))
    })
    it('rotate right with obstacle', () => {
      expect(JSON.stringify(updatePieceRot(gridWithObstacle, tetrimino, PIECES_ACTION.ROTATE_RIGHT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[3][1], coords: {posX:1, posY: -1}, rotate: 1}))
    })
    it('rotate left with obstacle', () => {
      expect(JSON.stringify(updatePieceRot(gridWithObstacle, tetrimino, PIECES_ACTION.ROTATE_LEFT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[3][3], coords: {posX:1, posY: -1}, rotate: 3}))
    })
  })

  describe('>>>>>updateTetriPos', () => {
    const grid = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    const gridWithObstacle = [[0,0,0,0,0],[1,0,0,0,1],[1,1,1,1,1],[1,1,1,1,1],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

    const tetrimino = {
      id: 6,
      pieceInfo: PIECES_INFO[5][1],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:1,
        posY:2
      },
      action: null,
      rotate:1,
    }

    it('rotate right', () => {
      expect(JSON.stringify(updateTetriPos(grid, tetrimino, PIECES_ACTION.ROTATE_RIGHT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][2], coords: {posX:1, posY: 2}, rotate: 2}))
    })
    it('rotate left', () => {
      expect(JSON.stringify(updateTetriPos(grid, tetrimino, PIECES_ACTION.ROTATE_LEFT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][0], coords: {posX:1, posY: 2}, rotate: 0}))
    })
    it('move right', () => {
      expect(JSON.stringify(updateTetriPos(grid, tetrimino, PIECES_ACTION.MOVE_RIGHT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], coords: {posX:2, posY: 2}, rotate: 1}))
    })
    it('move left', () => {
      expect(JSON.stringify(updateTetriPos(grid, tetrimino, PIECES_ACTION.MOVE_LEFT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], coords: {posX:0, posY: 2}, rotate: 1}))
    })
    it('move down', () => {
      expect(JSON.stringify(updateTetriPos(grid, tetrimino, PIECES_ACTION.MOVE_DOWN))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], coords: {posX:1, posY: 3}, rotate: 1}))
    })
    it('rotate right with obstacle', () => {
      expect(JSON.stringify(updateTetriPos(gridWithObstacle, tetrimino, PIECES_ACTION.ROTATE_RIGHT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][2], coords: {posX:1, posY: -1}, rotate: 2}))
    })
    it('rotate left with obstacle', () => {
      expect(JSON.stringify(updateTetriPos(gridWithObstacle, tetrimino, PIECES_ACTION.ROTATE_LEFT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][0], coords: {posX:1, posY: 0}, rotate: 0}))
    })
    it('move right with obstacle', () => {
      expect(JSON.stringify(updateTetriPos(gridWithObstacle, tetrimino, PIECES_ACTION.MOVE_RIGHT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], coords: {posX:1, posY: 2}, rotate: 1}))
    })
    it('move left with obstacle', () => {
      expect(JSON.stringify(updateTetriPos(gridWithObstacle, tetrimino, PIECES_ACTION.MOVE_LEFT))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], coords: {posX:1, posY: 2}, rotate: 1}))
    })
    it('move down with obstacle', () => {
      expect(JSON.stringify(updateTetriPos(gridWithObstacle, tetrimino, PIECES_ACTION.MOVE_DOWN))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], needNext: true, coords: {posX:1, posY: 2}, rotate: 1}))
    })
    it('invalid move', () => {
      expect(JSON.stringify(updateTetriPos(grid, tetrimino, "an invalid action"))).to.equal(JSON.stringify({...tetrimino, pieceInfo: PIECES_INFO[5][1], coords: {posX:1, posY: 2}, rotate: 1}))
    })
  })

  describe('>>>>>cloneTetri', () => {
    const tetrimino = {
      id: 4,
      pieceInfo: PIECES_INFO[5][0],
      pieceStep: 0,
      needNext:false,
      coords: {
        posX:11,
        posY:4
      },
      action: null,
      rotate:0,
    }
    it('clone a tetri', () => {
      expect(JSON.stringify(cloneTetri(tetrimino))).to.equal(JSON.stringify({...tetrimino}))
    })
  })

  describe('>>>>>gridDelLine', () => {
    const gridWith1Complete = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1]]
    const gridWith4Complete = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]
    const gridWithNoComplete = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

    it('complete 1 line', () => {
      expect(JSON.stringify(gridDelLine(gridWith1Complete))).to.equal(JSON.stringify([gridWithNoComplete, 1]))
    })
    it('complete 4 line', () => {
      expect(JSON.stringify(gridDelLine(gridWith4Complete))).to.equal(JSON.stringify([gridWithNoComplete, 4]))
    })
    it('complete 0 line', () => {
      expect(JSON.stringify(gridDelLine(gridWithNoComplete))).to.equal(JSON.stringify([gridWithNoComplete, 0]))
    })
  })

  describe('>>>>>asLoose', () => {
    const gridIsLost = [[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]
    const gridIsNotLost = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]
    const gridIsEmpty = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

    it('is lost', () => {
      expect(asLoose(gridIsLost)).to.equal(true)
    })
    it('not lost', () => {
      expect(asLoose(gridIsNotLost)).to.equal(false)
    })
    it('is empty', () => {
      expect(asLoose(gridIsEmpty)).to.equal(false)
    })
  })
  describe('>>>>>addMalusBlocks', () => {
    const gridWithBlocks = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]
    const gridIsEmpty = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]

    it('with blocks', () => {
      expect(JSON.stringify(addMalusBlocks(gridWithBlocks, 0))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1]]))
      expect(JSON.stringify(addMalusBlocks(gridWithBlocks, 1))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[1,1,1,1,1],[1,1,1,1,1],[9,9,9,9,9]]))
      expect(JSON.stringify(addMalusBlocks(gridWithBlocks, 3))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[1,1,1,1,1],[9,9,9,9,9],[9,9,9,9,9],[9,9,9,9,9]]))
      expect(JSON.stringify(addMalusBlocks(gridWithBlocks, 5))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[9,9,9,9,9],[9,9,9,9,9],[9,9,9,9,9],[9,9,9,9,9],[9,9,9,9,9]]))
    })
    it('empty grid', () => {
      expect(JSON.stringify(addMalusBlocks(gridIsEmpty, 0))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]))
      expect(JSON.stringify(addMalusBlocks(gridIsEmpty, 2))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[9,9,9,9,9],[9,9,9,9,9]]))
      expect(JSON.stringify(addMalusBlocks(gridIsEmpty, 3))).to.equal(JSON.stringify([[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[9,9,9,9,9],[9,9,9,9,9],[9,9,9,9,9]]))
    })
  })
})
