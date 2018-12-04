import {PIECES_NUM} from "../../common/pieces";

const arrayCompare = (a1, a2) => {
  if(a1.length !== a2.length) {
    return false;
  }
  for(let i in a1) {
    if(a1[i] instanceof Array && a2[i] instanceof Array) {
      if(!arrayCompare(a1[i], a2[i])) {
        return false;
      }
    }
    else if(a1[i] !== a2[i]) {
      return false;
    }
  }
  return true;
}

const createChallengerGrid = (players) => {
  if (players.length >= 2) {
    let grid;
    for (let i in players) {
      grid && grid.length >= 1 ? grid = mergeGrid(grid, players[i].spectre) : grid = mergeGrid(players[i].spectre, players[i++].spectre)
    }
    return grid
  }
  return players[0].spectre
}

const mergeGrid = (grid1, grid2) => {
  let newGrid = []

  if (grid1) {
    for (let i in grid1) {
      newGrid[i] = grid1[i]
      if (!arrayCompare(grid1[i], grid2[i])) {
        for (let j in grid1[i]) {
          newGrid[i][j] = grid1[i][j]
          if (grid2 && PIECES_NUM.empty !== grid2[i][j]) {
            newGrid[i][j] = grid2[i][j]
          }
        }
        if (grid2) {
          for (let j in grid2[i]) {
            newGrid[i][j] = grid2[i][j]
            if (grid1 && PIECES_NUM.empty !== grid1[i][j]) {
              newGrid[i][j] = grid1[i][j]
            }
          }
        }
      }
    }
  }
  return newGrid
}

export {
  arrayCompare,
  mergeGrid,
  createChallengerGrid,
};
