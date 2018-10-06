import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM} from "../../common/pieces";

const COLLISION_TYPE = {
  PIECE: "collision_piece",
  LIMIT: "collision_limit",
};

const PRIO_COLLISION = [
  COLLISION_TYPE.PIECE,
  COLLISION_TYPE.LIMIT,
];

const hasCollision = (grid, piece, pos) => {
  let collisionType = undefined;
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + pos.X;
    const gy = y + pos.Y;

    if (gy < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_TOP)) {
        collisionType = COLLISION_TYPE.LIMIT;
      }
    }
    else if (gy >= grid.length && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_BOTTOM)) {
        collisionType = COLLISION_TYPE.LIMIT;
      }
    }
    else if (gx < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_LEFT)) {
        collisionType = COLLISION_TYPE.LIMIT;
      }
    }
    else if (gx >= GRID_WIDTH && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.WALL_RIGHT)) {
        collisionType = COLLISION_TYPE.LIMIT;
      }
    }
    else if (number !== 0 && grid[gy][gx] !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.PIECE)) {
        collisionType = COLLISION_TYPE.PIECE;
      }
    }
  }));
  return collisionType;
};

const placePiece = (grid, pieceInfo, pos) => {
  const newGrid = grid.map(l => l.map(e => e));
  const pieceDescr = pieceInfo.piece
  console.log(pieceDescr)

  pieceDescr.forEach((line, y) => {
      return line.forEach((number, x) => {
          const gx = x + pos.X;
          const gy = y + pos.Y;
          if (number !== 0 && number !== undefined) {
            if (gx >= 0 && gy >= 0 &&
              gy < newGrid.length && gx < newGrid[gy].length) {
              newGrid[gy][gx] = number;
            } else {
              console.log(["invalide placement:"]);
            }
          }
        }
      )
    }
  );
  return newGrid;
};

const placePiecePreview = (grid, pieceInfo, pos) => {
  const newGrid = grid.map(l => l.map(e => e));
  const pieceDescr = pieceInfo.piece

  if (!hasCollision(grid, pieceDescr, pos)) {
    pos.Y++;
  }
  if (pos.y > 0) {
    pos.Y--;
  }

  pieceDescr.forEach((line, y) =>
    line.forEach((number, x) => {
        const gx = x + pos.X;
        const gy = y + pos.Y;
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

const addTetriminos = (tetrimino, grid) => {
  const {coords, pieceInfo} = tetrimino
  const pos = {X: coords.posX, Y: coords.posY}
  const prevPos = {X: coords.prevPosX, Y: coords.prevPosY}
  const rightPos = prevPos.X === null ? pos : prevPos
  grid = placePiecePreview(grid, pieceInfo, pos)
  grid = placePiece(grid, pieceInfo, rightPos)
  return grid
}


export {
  addTetriminos,
  hasCollision,
  placePiece,
  COLLISION_TYPE,
  placePiecePreview
}
