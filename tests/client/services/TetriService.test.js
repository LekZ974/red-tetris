import React from 'react';
import { expect } from 'chai'
import {hasCollision, placePiece, placePiecePreview} from '../../../src/client/services/TetriService';
import {GRID_HEIGHT, GRID_WIDTH} from "../../../src/common/grid";
import {PIECES_NUM, PIECES_INFO} from "../../../src/common/pieces";

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
    it('Limit Down 15,20', () => {
      const grid = Array(GRID_HEIGHT).fill(0).map(() => Array(GRID_WIDTH).fill(PIECES_NUM.empty));
      const coords = {posX: 15, posY: 20}
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
  })
  describe('>>>>>finalPos', () => {
    it('place Piece 0,0', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[2][3],
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
        [0, 8, 0, 0, 0, 0, 0, 0, 0, 0],
        [8, 8, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 8, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
    it('place Piece 4,7', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[4][0],
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
        [0, 0, 0, 0, 8, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 8, 8, 8, 0, 0, 0]
      ]))
    })
    it('place Piece output', () => {
      const tetrimino = {
        items: [],
        pieceInfo: PIECES_INFO[5][0],
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
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ]))
    })
  })
})
