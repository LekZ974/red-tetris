import React, { Component } from 'react'
import {move, reset, tetriminosTick, button, requestShape, collision} from '../../actions/tetriminos'
import { socket } from '../../index'
const lines=[0,0,0,0,0,0,0,0,0,0]
import { connect } from 'react-redux';
/**
 * Forme 
 * 1 O
 * 2 I
 * 3 T
 * 4 L
 * 5 J
 * 6 Z
 * 7 S
 * 
 * Rotation
 * 0 => 0
 * 1 =>90
 * 2=> 180
 * 3=>270
 */
const commandes = () => (
  <div style={{ border: '1px, solid blue' }}>
    <h5 style={{ textAlign: 'center' }}>Commandes</h5>
    <span style={{ marginRight: '60px' }}>&rarr; ou &larr;</span> Déplacement horizontal à gauche ou à droite<br/>
    <span style={{ marginRight: '110px' }}>&uarr;</span>Rotation<br/>
    <span style={{ marginRight: '110px' }}>&darr;</span>Chute en direction du tas<br/>
    <span style={{ marginRight: '55px', height: '16px', width: '100px', border: '1px solid black', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', fontSize: '10px' }}>Space</span>
      Déplacement vertical afin de positionner une pièce dans un trou du tas<br/>
  </div>
)

const pink = '#f2cbe0'

const green = '#e1f2cb'

const orange = '#f2e1cb'

// const blue = '#cbe6f2'

function handleKeyUp(e) {
  // const {move} = props
  // move(e)
}

function start(e){
  console.log('innerHTML',e.target.innerHTML)
  windowTick
  store.dispatch(button(e))
}


function canPlacePiece(array, sharp, pos, tetriNumber){
  const sharpLength = sharp.length
  const sharpElementLenght = sharp[0].length

  array[pos.Y][pos.X] = 0
  array[pos.Y][pos.X] = 0
  for( let i = 0 ; sharpLength > i ; i++){
    for (let j = 0 ; sharpElementLenght > j; j++){
      if(sharp[i][j] === tetriNumber)
       if( array[pos.Y + j][pos.X + i] !== 0){
         return false
       }
    }
  }
  return true   
}

function placePiece(array, sharp, pos, tetriNumber){
  const sharpLength = sharp.length
  const sharpElementLenght = sharp[0].length

  array[pos.X][pos.Y] = 0
  array[pos.X][pos.Y] = 0

  for( let i = 0 ; sharpLength > i ; i++){
    for (let j = 0 ; sharpElementLenght > j; j++){
      if(sharp[i][j] === tetriNumber){
        array[pos.Y + j][pos.X + i] = tetriNumber
      }
  
    }
  }
 
}

function erasePiece(array, sharp, pos, tetriNumber){
  const sharpLength = sharp.length
  const sharpElementLenght = sharp[0].length

  for( let i = 0 ; sharpLength > i ; i++){
    for (let j = 0 ; sharpElementLenght > j; j++){
       array[pos.Y + j][pos.X + i] = 0
  
    }
  }
 
}

function checkNextPos(tetriNumber,piece, pos, prevPos, array, step){

  erasePiece(array, piece, prevPos, tetriNumber)

  if(canPlacePiece(array, piece, pos, tetriNumber)){
    return true
  }

  const rightPos = prevPos.X === null ? pos : prevPos

  placePiece(array, piece, rightPos, tetriNumber)
  return false
}

function checkLinesIsFull(lines){

  for(let i = 0; i <= 10 ; i++){
    if(lines[i] === 0){
        return false      
    }
  }
  return true
}

function deleteFullLines(linesIndexToDelete, arrayToClean){
  const numberOfLinesToDelete = linesIndexToDelete.length

  for(let i = 0; i < numberOfLinesToDelete + 1; i++){
    arrayToClean.splice(linesIndexToDelete[i], 1)
  } 

  for(let a = 0 ;a <  numberOfLinesToDelete + 1; a++){
    arrayToClean.unshift(lines)
  }
  return arrayToClean
}

function checkArray(arrayToCheck){
  let linesIndexToDelete=[]
  for(let i = 0; i < 20 ; i++){
    if(checkLinesIsFull(arrayToCheck[i])){
      linesIndexToDelete.push(i)
    }
  }
   const cleanArray = deleteFullLines(linesIndexToDelete, arrayToCheck)
  return(cleanArray)
}

function addTetriminos(pos, prevPos, piece, array, tetriminos){
  const step = 1

  const tetriNumber = Math.max(...piece[0])

  if(checkNextPos(tetriNumber, piece ,pos , prevPos, array ,1)){
    placePiece(array, piece, pos, tetriNumber)
    return true  
  }
  return false
}

function resetButton(props){
  // console.log('reset')
  const{
    reset
  } = props

 reset()
}

const PlayGround = (props) =>{
 
  const { 
    tetriData, 
    playgroundGrid,
    pos,
    prevPos,
    start,
    move,
    reset,
    button
  } = props

  console.log('tetridata', tetriData, props)
 
  const buttonValue = start === true ? 'Pause' : 'Start'

  if(tetriData.tetriminosPosX === 5 && tetriData.tetriminosPosY === 0){
    
 }
 const piece = [
  [3, 3, 3],
  [0, 3, 0],
  [0, 0, 0]
 ]

  let array = playgroundGrid
  addTetriminos(pos, prevPos, piece, playgroundGrid, 1)
       array = tetriData.playground.map((row, key) =>{
        return(<div key={key}>{row}</div>)
    });
  
  return(
    <div>
      <h3 style={{ textAlign: 'center' }}>PlayGround</h3>
      <div>
        {array}
      </div>
      <button onClick={ start }>{buttonValue}</button>
      <button onClick={reset }>Reset</button>
      {commandes()}
    </div>
  )
}

window.addEventListener('keydown', handleKeyUp )
//export const windowTick = window.setInterval(()=>{store.dispatch(tetriminosTick())} ,1000 )

function mapStateToProps(state){
  const  tetriData = state.tetriminos
  const   pos = {
    X:state.tetriminos.tetriminosPosX,
    Y:state.tetriminos.tetriminosPosY
  }
  const prevPos ={
    X:state.tetriminos.prevPosX,
    Y:state.tetriminos.prevPosY
  }
  const playgroundGrid = state.tetriminos.playground
  const start = state.tetriminos.start
  return {tetriData, pos, prevPos, playgroundGrid, start}
}

function mapDispatchToProps(dispatch){
  
  return {
    reset: () => dispatch(reset()),
    button: (data) => dispatch(button(data)),
    move: (data) => dispatch(move(data)),

  }
}



export default connect(mapStateToProps, mapDispatchToProps)(PlayGround, handleKeyUp)
