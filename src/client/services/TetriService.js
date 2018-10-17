import React from "react";
import LINE from '../../common/pieces'

const getColor = (color) =>{
  switch (color){
  case 0 :
    return 'white'
    case 1 :
      return 'blue'
    case 2 :
      return 'purple'
    case 3 :
      return 'yellow'
    case 4 :
      return 'red'
    case 5 :
      return 'orange'
    case 6 :
      return 'green'
    case 7 :
      return 'pink'
    default:
      return 'white'

  }
}
  const         canPlacePiece = (pieceInfo, shapeElementLenght, shapeLength, pos, grid) => {

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
        console.log('posY et posX', pos.Y)
        console.log('posY et posX', j)
        console.log('posY et posX', pos.Y + j)
        console.log('posY et posX', pos.Y)
        console.log('posY et posX', pos.Y)
        grid[pos.Y + j][pos.X + i] = 0
      }
    }

  }

  const checkNextPos = (pieceInfo, pos, prevPos, grid) => {

    const shapeLength = pieceInfo.piece.length
    const shapeElementLenght = pieceInfo.info.width
    const rightPos = prevPos.X === null ? pos : prevPos
    console.log('1')
    erasePiece(shapeElementLenght, shapeLength, rightPos, grid)
    console.log('2')
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
      arrayToClean.unshift(LINE)
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

  const colorGrid = (grid) =>{
    return grid.map((row, key) =>{
      const rowline = row.map((element, id) =>{
        const color = getColor(element)

        if(id === 0){
          return <div key={id} style={{backgroundColor:color, width:'10px',height:'10px', display:'inline',float:'left',clear:'both', border:'1px black solid'}}></div>
        }
        return <div key={id} style={{backgroundColor:color, width:'10px',height:'10px', display:'inline', float:'left', border:'1px black solid'}}></div>
      })
      return(<div key={key}>{rowline}</div>)
    });

  }

  export {
    addTetriminos,
    checkLinesIsFull,
    canPlacePiece,
    colorGrid,
    checkArray,
    getColor,
    checkNextPos,
    deleteFullLines,
    erasePiece,
    placePiece
  };

