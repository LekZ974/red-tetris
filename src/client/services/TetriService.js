

  const canPlacePiece = (pieceInfo, shapeElementLenght, shapeLength, pos, grid) => {

    grid[pos.Y][pos.X] = 0
    grid[pos.Y][pos.X] = 0
    for( let i = 0 ; shapeLength > i ; i++){
      for (let j = 0 ; shapeElementLenght > j; j++){
        if(pieceInfo.piece[i][j] === pieceInfo.info.id)
         if( grid[pos.Y + j][pos.X + i] !== 0){
           return false
         }
      }
    }
    return true
  }

  const placePiece = (pieceInfo, shapeElementLenght, shapeLength, pos, grid) => {

    grid[pos.X][pos.Y] = 0

    for( let i = 0 ; shapeLength > i ; i++){
      for (let j = 0 ; shapeElementLenght > j; j++){
        if(pieceInfo.piece[i][j] === pieceInfo.info.id){
          grid[pos.Y + j][pos.X + i] = pieceInfo.info.id
        }
      }
    }
  }

  const erasePiece = (shapeElementLenght, shapeLength, pos, grid) => {

    for( let i = 0 ; shapeLength > i ; i++){
      for (let j = 0 ; shapeElementLenght > j; j++){
        grid[pos.Y + j][pos.X + i] = 0
      }
    }

  }

  const checkNextPos = (pieceInfo, pos, prevPos, grid) => {

    const shapeLength = pieceInfo.piece.length
    const shapeElementLenght = pieceInfo.info.width
    const rightPos = prevPos.X === null ? pos : prevPos
    erasePiece(shapeElementLenght, shapeLength, rightPos, grid)

    if (canPlacePiece(pieceInfo, shapeElementLenght, shapeLength, rightPos, grid)) {
      placePiece(pieceInfo, shapeElementLenght, shapeLength, rightPos, grid)
      return true
    }
    placePiece(shapeElementLenght, shapeLength, rightPos, grid)
    return false
  }

  const checkLinesIsFull = (lines) => {

    for(let i = 0; i <= 10 ; i++){
      if(lines[i] === 0){
          return false
      }
    }
    return true
  }

  const deleteFullLines = (linesIndexToDelete, arrayToClean) => {
    const numberOfLinesToDelete = linesIndexToDelete.length

    for(let i = 0; i < numberOfLinesToDelete + 1; i++){
      arrayToClean.splice(linesIndexToDelete[i], 1)
    }

    for(let a = 0 ;a <  numberOfLinesToDelete + 1; a++){
      arrayToClean.unshift(lines)
    }
    return arrayToClean
  }

  const checkArray = (arrayToCheck) => {
    let linesIndexToDelete=[]
    for(let i = 0; i < 20 ; i++){
      if(checkLinesIsFull(arrayToCheck[i])){
        linesIndexToDelete.push(i)
      }
    }
     const cleanArray = deleteFullLines(linesIndexToDelete, arrayToCheck)
    return(cleanArray)
  }

  const addTetriminos = (tetrimino, grid) => {
    const {coords, pieceInfo} = tetrimino
    const pos = {X: coords.posX, Y: coords.posY}
    const prevPos = {X: coords.prevPosX, Y: coords.prevPosY}

    if(checkNextPos(pieceInfo, pos, prevPos, grid)){
      return true
    }
    return false
  }

  export {
    addTetriminos,
    checkLinesIsFull,
    canPlacePiece,
    checkArray,
    checkNextPos,
    deleteFullLines,
    erasePiece,
    placePiece
  };

