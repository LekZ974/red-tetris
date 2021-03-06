import {GRID_WIDTH} from "../../common/grid";
import {PIECES_NUM, PIECES_ACTION, PIECES_INFO, PRIO_COLLISION, COLLISION_TYPE} from "../../common/pieces";

const hasCollision = (grid, piece, coords) => {
  let collisionType = undefined;
  const { posX, posY } = coords
  piece.forEach((line, y) => line.forEach((number, x) => {
    const gx = x + posX;
    const gy = y + posY;

    if (gy < 0 && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.LIMIT_TOP)) {
        collisionType = COLLISION_TYPE.LIMIT_TOP;
      }
    }
    else if (gy >= grid.length && number !== 0) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.LIMIT_DOWN)) {
        collisionType = COLLISION_TYPE.LIMIT_DOWN;
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
    else if (number !== 0 && grid[gy][gx] !== 0 && number !== 8 && grid[gy][gx] !== 8) {
      if (PRIO_COLLISION.indexOf(collisionType) < PRIO_COLLISION.indexOf(COLLISION_TYPE.PIECE)) {
        collisionType = COLLISION_TYPE.PIECE;
      }
    }
  }));
  return collisionType;
};

const placePiece = (grid, tetrimino) => {
  const newGrid = grid.map(l => l.map(e => e));
  const {pieceInfo, coords} = tetrimino
  const {posX, posY} = coords


  pieceInfo.piece.forEach((line, y) => {
    return line.forEach((number, x) => {
      const gx = x + posX;
      const gy = y + posY;
      if (number !== 0 && number) {
        if (gx >= 0 && gy >= 0 &&
          gy < newGrid.length && gx < newGrid[gy].length) {
          newGrid[gy][gx] = number;
        }
      }
    })
  });
  return newGrid;
};

const placePiecePreview = (grid, tetrimino) => {
  const newGrid = grid.map(l => l.map(e => e));
  const { pieceInfo, coords } = tetrimino


  const newPos = finalPos(grid, pieceInfo.piece, coords)

  pieceInfo.piece.forEach((line, y) =>
    line.forEach((number, x) => {
      const gx = x + newPos.posX;
      const gy = y + newPos.posY;
      if (number !== 0) {
        if (gx >= 0 && gy >= 0 &&
          gy < newGrid.length && gx < newGrid[gy].length) {
          newGrid[gy][gx] = PIECES_NUM.preview;
        }
      }
    })
  );
  return newGrid;
};

const finalPos = (grid, piece, coords) => {
  while (!(hasCollision(grid, piece, coords)))  {
    coords.posY++;
  }
  if (coords.posY > 0) {
    coords.posY--;
  }
  return coords
}

const newRot = (rot, move) => {
  if (move === PIECES_ACTION.ROTATE_RIGHT) {
    return (rot + 1) % 4;
  }
  if (move === PIECES_ACTION.ROTATE_LEFT) {
    return (rot + 3) % 4;
  }
  return rot;
};

const newCoords = (coords, move) => {
  if (move === PIECES_ACTION.MOVE_DOWN)
    return {posX: coords.posX, posY: coords.posY + 1};
  else if (move === PIECES_ACTION.MOVE_LEFT)
    return {posX: coords.posX - 1, posY: coords.posY};
  else if (move === PIECES_ACTION.MOVE_RIGHT)
    return {posX: coords.posX + 1, posY: coords.posY};
  return {posX: coords.posX, posY: coords.posY};
};

const moveCollision = (tetrimino, grid) => {

  const newPiece = cloneTetri(tetrimino);
  const newPieceDescr = newPiece.pieceInfo.piece;

  let collisionType = hasCollision(grid, newPieceDescr, newPiece.coords);

  while (collisionType && collisionType !== COLLISION_TYPE.LIMIT_TOP) {
    if (collisionType === COLLISION_TYPE.LIMIT_LEFT) {
      newPiece.coords.posX++;
    } else if (collisionType === COLLISION_TYPE.LIMIT_RIGHT) {
      newPiece.coords.posX--;
    } else {
      newPiece.coords.posY--;
    }
    collisionType = hasCollision(grid, newPieceDescr, newPiece.coords);
  }
  return newPiece;
};

const updatePieceRot = (grid, tetrimino, move) => {

  const rotate = newRot(tetrimino.rotate, move)
  const newPiece = {
    ...tetrimino,
    rotate: rotate,
    coords: newCoords(tetrimino.coords, move),
    pieceInfo: PIECES_INFO[tetrimino.id - 1][rotate]
  }

  return moveCollision(newPiece, grid);
};

const updateTetriPos = (grid, tetrimino, move) => {
  if (tetrimino && tetrimino.hasOwnProperty('pieceInfo')) {
    if (move === PIECES_ACTION.ROTATE_LEFT || move === PIECES_ACTION.ROTATE_RIGHT) {
      return updatePieceRot(grid, tetrimino, move)
    } else if (move === PIECES_ACTION.MOVE_RIGHT || move === PIECES_ACTION.MOVE_LEFT) {
      const newPiece = {
        ...tetrimino,
        rotate: newRot(tetrimino.rotate, move),
        coords: newCoords(tetrimino.coords, move)
      }
      const newPieceDescr = newPiece.pieceInfo.piece;
      if (!hasCollision(grid, newPieceDescr, newPiece.coords)) {
        return newPiece
      }
      return tetrimino;
    }
    else if (move === PIECES_ACTION.MOVE_DOWN) {
      const newPiece = {
        ...tetrimino,
        rotate: newRot(tetrimino.rotate, move),
        coords: newCoords(tetrimino.coords, move)
      }
      const newPieceDescr = newPiece.pieceInfo.piece;
      if (!hasCollision(grid, newPieceDescr, newPiece.coords)) {
        return newPiece
      }
      if (tetrimino.needNext) {
        return {
          ...tetrimino,
          needNext: false,
        };
      }
      return {
        ...tetrimino,
        needNext: true,
      };
    }
    else if (move === PIECES_ACTION.MOVE_DROP) {
      const newPiece = {
        ...tetrimino,
      }
      const newPieceDescr = newPiece.pieceInfo.piece;
      return {
        ...newPiece,
        coords: finalPos(grid, newPieceDescr, newPiece.coords),
      }
    }
  }
  return tetrimino;
}

const cloneTetri = piece => Object.assign({}, piece, {coords: Object.assign({}, piece.coords)});

const gridDelLine = grid => {

  let nbWall = 0;
  let lineToDel = [];
  let newGrid = grid.map(l => l.map(e => e));

  newGrid.forEach((line, i) => {
    let asEmpty = false;
    line.forEach(el => {
      if (el === PIECES_NUM.empty || el === PIECES_NUM.malus) {
        asEmpty = true;
      }
    });
    if (!asEmpty) {
      lineToDel.push(i);
    }
  });

  newGrid = newGrid.filter((line, i) => !lineToDel.includes(i));
  while (newGrid.length < grid.length) {
    newGrid = [Array(grid[0].length).fill(PIECES_NUM.empty), ...newGrid];
  }

  return [newGrid, lineToDel.length - nbWall];
};

const asLose = grid => {
  return grid && grid.length >= 1 && ((grid[0].some(e => e !== PIECES_NUM.empty && e !== PIECES_NUM.preview) ||
    grid[1].some(e => e !== PIECES_NUM.empty && e !== PIECES_NUM.preview) ||
      grid[2].some(e => e !== PIECES_NUM.empty && e !== PIECES_NUM.preview)))
};

const addMalusBlocks = (grid, amount) => {
  const newGrid = grid.map(l => l.map(e => e));

  for (let i = 0; i < amount; i++) {
    newGrid.pop()
  }
  for (let i = 0; i < amount; i++) {
    newGrid.push(Array(grid[0].length).fill(PIECES_NUM.malus));
  }

  return newGrid;
};

const malusResizeGrid = (grid, amount) => {
  if (grid.length > 0) {
    const newGrid = grid.map(l => l.map(e => e));

    for (let i = 0; i < amount; i++) {
      newGrid.push(Array(grid[0].length).fill(PIECES_NUM.malus));
      newGrid.shift();
    }

    return newGrid;
  }
};

const gameExist = (gameName, listGames) => {
  if (Array.isArray(listGames) && listGames.length >= 1) {
    return listGames.map(game => {
      return gameName === game;
    })
  }
  return false
}

export {
  updateTetriPos,
  finalPos,
  hasCollision,
  placePiece,
  COLLISION_TYPE,
  placePiecePreview,
  cloneTetri,
  gridDelLine,
  asLose,
  addMalusBlocks,
  malusResizeGrid,
  newRot,
  newCoords,
  updatePieceRot,
  gameExist,
}
