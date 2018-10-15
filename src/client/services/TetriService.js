import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";
import {tetriInitNew, updateTetriPos} from "../actions/tetrimino";
import {store} from "../index";
import {emitGamePieces} from "../actions/game";
import {updateGrid} from "../actions/user";

const TETRI_ACTION = {
  ROTATE_LEFT: "rotate_left",
  ROTATE_RIGHT: "rotate_right",
  MOVE_LEFT: "move_left",
  MOVE_RIGHT: "move_right",
  MOVE_DROP: "move_drop",
};

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  LIMIT_DOWN: "collision_limit_down",
  LIMIT_TOP: "collision_limit_top",
  LIMIT_LEFT: "collision_limit_left",
  LIMIT_RIGHT: "collision_limit_right",
};

const PRIO_COLLISION = [
  COLLISION_TYPE.PIECE,
  COLLISION_TYPE.LIMIT_DOWN,
  COLLISION_TYPE.LIMIT_TOP,
  COLLISION_TYPE.LIMIT_LEFT,
  COLLISION_TYPE.LIMIT_RIGHT,
];

const hasCollision = (grid, piece, pos) => {
  let collisionType = undefined;
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + pos.X;
    const gy = y + pos.Y;

    if (gy < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.LIMIT_TOP)) {
        collisionType = COLLISION_TYPE.LIMIT_TOP;
      }
    }
    else if (gy >= grid.length && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.LIMIT_DOWN)) {
        collisionType = COLLISION_TYPE.LIMIT_DOWN;
        // store.dispatch(tetriIsBlock(collisionType))
      }
    }
    else if (gx < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.LIMIT_LEFT)) {
        collisionType = COLLISION_TYPE.LIMIT_LEFT;
      }
    }
    else if (gx >= GRID_WIDTH && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.LIMIT_RIGHT)) {
        collisionType = COLLISION_TYPE.LIMIT_RIGHT;
      }
    }
    else if (number !== 0 && grid[gy][gx] !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.PIECE)) {
        collisionType = COLLISION_TYPE.PIECE;
        // store.dispatch(tetriIsBlock(collisionType))
      }
    }
  }));
  return collisionType;
};

const placePiece = (grid, tetrimino) => {
  const newGrid = grid.map(l => l.map(e => e));
  const {pieceInfo, coords} = tetrimino
  const pos = {X: coords.posX, Y: coords.posY}

  pieceInfo.piece.forEach((line, y) => {
      return line.forEach((number, x) => {
          const gx = x + pos.X;
          const gy = y + pos.Y;
          if (number !== 0) {
            if (gx >= 0 && gy >= 0 &&
              gy < newGrid.length && gx < newGrid[gy].length) {
              newGrid[gy][gx] = number;
            } else {
              console.log(["invalide placement:", grid]);
            }
          }
        }
      )
    }
  );
  return newGrid;
};

const placePiecePreview = (grid, tetrimino) => {
  const newGrid = grid.map(l => l.map(e => e));
  const { pieceInfo, coords } = tetrimino
  const pos = {X: coords.posX, Y: coords.posY}

  const newPos = updatePos(grid, pieceInfo.piece, coords, tetrimino.action)

  pieceInfo.piece.forEach((line, y) =>
    line.forEach((number, x) => {
        const gx = x + newPos.X;
        const gy = y + newPos.Y;
        if (number !== 0) {
          if (gx >= 0 && gy >= 0 &&
            gy < newGrid.length && gx < newGrid[gy].length) {
            newGrid[gy][gx] = PIECES_NUM.preview;
          } else {
            console.log(["invalide placement:"]);
          }
        }
      }
    )
  );
  return newGrid;
};

const updatePos = (grid, piece, coords, action) => {
  const pos = {X: coords.posX, Y: coords.posY}
  if (TETRI_ACTION.MOVE_DROP === action) {
    while (!hasCollision(grid, piece, pos))  {
      pos.Y++;
    }
    pos.Y--;
  }
  else if (!hasCollision(grid, piece, pos)) {
    pos.Y++;
  }
  if (pos.Y > 0) {
    pos.Y--;
  }
  return pos
}

const nextTetri = (tetrimino, grid) => {
    store.dispatch(updateGrid(grid));
    store.dispatch(emitGamePieces());
    store.dispatch(tetriInitNew())
}

// const addTetriminos = (tetrimino, grid) => {
//   const {coords, pieceInfo} = tetrimino
//   const pos = {X: coords.posX, Y: coords.posY}
//   const prevPos = {X: coords.prevPosX, Y: coords.prevPosY}
//   const rightPos = prevPos.X === null ? pos : prevPos
//   const prevGrid = placePiecePreview(grid, tetrimino, rightPos)
//   const newGrid = placePiece(prevGrid, tetrimino, rightPos)
//   if (tetrimino.collision) {
//     nextTetri(tetrimino, newGrid)
//   }
//   return newGrid
// }

const clonePiece = piece => Object.assign({}, piece, {coords: Object.assign({}, piece.coords)});

export {
  // addTetriminos,
  updatePos,
  nextTetri,
  hasCollision,
  placePiece,
  COLLISION_TYPE,
  placePiecePreview,
  clonePiece
}
