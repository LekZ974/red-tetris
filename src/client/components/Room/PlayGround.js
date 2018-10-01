import React, { Component } from 'react'
import { store } from '../../index'
import {move, reset, tetriminosTick, button} from '../../actions/tetriminos'

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

const Square = (props) => (
  <div style={tetrisSquareBlue}>
    <div style={subBlock(blue, props.posX, props.posY)} />
    <div style={subBlock(blue, props.posX, props.posY)} />
    <div style={subBlock(blue, props.posX, props.posY)} />
    <div style={subBlock(blue, props.posX, props.posY)} />
  </div>
)

const Row = (props) => (
  <div style={tetrisRowPink}>
    <div style={subBlock(pink, props.posX, props.posY)} />
    <div style={subBlock(pink, props.posX, props.posY)} />
    <div style={subBlock(pink, props.posX, props.posY)} />
    <div style={subBlock(pink, props.posX, props.posY)} />
  </div>
)
const L = (props) => (
  <div style={tetrisLGreen}>
    <div style={subBlock(green, props.posX, props.posY, props.rot)} />
    <div style={subBlock(green, props.posX, props.posY, props.rot)} />
    <div style={subBlock(green, props.posX, props.posY, props.rot)} />
    <div style={LsubBlock(green, props.posX, props.posY, props.rot)} />
  </div>
)

const T = (props) => (
  <div style={tetrisTOrange}>
    <div style={subBlock(orange, props.posX, props.posY)} />
    <div style={subBlock(orange, props.posX, props.posY)} />
    <div style={subBlock(orange, props.posX, props.posY)} />
    <div style={subBlock(orange, props.posX, props.posY)} />
  </div>
)
const flexContenaire = {
  border: '3px solid #fff',

  /* width: 606px;*/
  width: '100%',
  display: 'flex',
  height: '50vh',
  margin: '5vh auto',
  flexFlow: 'row wrap',
  alignItems: 'flex-end',
  justifyContent: 'center',
  alignContent: 'flex-end',
  boxSizing: 'border-box',
  border: ' 1px solid red',
}

const tetrisSquareBlue = {
  width: '100px',
  height: '100px',
  display: 'flex',
  flexFlow: 'row wrap',
}

const tetrisRowPink = {
  width: '200px',
  height: '50px',
  display: 'flex',
  flexFlow: 'row no-wrap',
  transform: 'rotate(90deg)',

}

const tetrisLGreen = {
  width: '150px',
  height: '100px',

  /* transform: rotate(270deg);
  transform-origin: 33.3%;*/
  marginRight: '-50px',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'flex-start',

}

const subBlockNone = {
  border: '1px solid #fff',
  width: '50px',
  height: '50px',
  alignSelf: 'flex-end',
  backgroundColor: 'rgba(0,0,0,0)',

}
const tetrisTOrange = {
  width: '150px',
  height: '100px',
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center',
}
const subBlock = (color, posX, posY, rot) => {
  const position = `${posX }px ,${ posY }px`

  return ({
    border: '1px solid #fff',
    width: '48px',
    height: '48px',
    backgroundColor: color,
    transform: `translate(${ position})`,
  })

}

const LsubBlock = (color, posX, posY, rot) => {
  const position = `${posX }px ,${ posY }px`

  return ({
    border: '1px solid #fff',
    width: '50px',
    height: '50px',
    alignSelf: 'flex-end',
    backgroundColor: color,
    transform: `translate(${ position})`,

  })

}

const Tetriminos = (props) => {

  let piece = null
  switch (props.type) {
  case 'o':
    (piece = <Square
      posX={props.posX}
      posY={props.posY}
      rot={props.rot}

    />
    )
    break
  case 'i':
    (piece = <Row
      posX={props.posX}
      posY={props.posY}
    />
    )
    break
  case 'l':
    (piece = <L
      posX={props.posX}
      posY={props.posY}
      rot={props.rot}
    />
    )
    break
  case 't':
    (piece = <T
      posX={props.posX}
      posY={props.posY}
    />
    )
    break
  }

  return (
    <div>
      {piece}
    </div>

  )

}

function handleKeyUp(e) {
  console.log('e', e)
  store.dispatch(move(e))
}

function start(e){

  console.log('innerHTML',e.target.innerHTML)
  windowTick
  store.dispatch(button(e))
}

function checkIfIsInArray(number, axe){
  console.log('checkIfIsAtrray', number, axe)
  if(axe === 'X'){
    return number >= 0 && number <= 9
  }
  if(axe === 'Y'){
    return number >= 0 && number <= 20

  }
  return false
}
function checkNextPos(sharp, pos, array, step){

  let A = null
  let B = null
  let C = null
  let D = null
    console.log('checkNextPos', pos, step)
    switch(sharp){
      case 1:{
       
        if( checkIfIsInArray( pos.X, 'X') && checkIfIsInArray(pos.Y + step, 'Y')
            && checkIfIsInArray(pos.Y + 1 + step, 'Y') && checkIfIsInArray( pos.X + 1, 'X') 
            && checkIfIsInArray(pos.Y + step, 'Y') && checkIfIsInArray(pos.Y + 1 + step,'Y')
            && checkIfIsInArray( pos.Y, 'Y') ){
              console.log('check is OOOOOOOKKKKK')
              array[pos.Y][pos.X] = 0
              console.log('array', array, pos.Y,)
              array[pos.Y + 1][pos.X] = 0
              array[pos.Y][pos.X + 1] = 0
              array[pos.Y + 1][pos.X + 1 ] = 0
            A = array[pos.Y + step][pos.X] 
            B = array[pos.Y + 1 + step][pos.X] 
            C = array[pos.Y + step][pos.X + 1]
            D = array[pos.Y + 1 + step][pos.X + 1 ]
            console.log('AVANT RETURN', array)
            if(A === 0 && B === 0
              && C === 0 && D === 0){
                console.log('RETURN TRUE')
                return true
              }
              console.log('RETOUR FALSE')
            return false
        }
        // else{
        //   array[pos.X][pos.Y] = 'B'
        //   array[pos.X][pos.Y + 1] = 'B'
        //   array[pos.X + 1][pos.Y] = 'B'
        //   array[pos.X + 1 ][pos.Y + 1] = 'B'
        // }
        break
    }
      case 2:{
        if(pos.rot === 0){
          A = array[pos.X + step][pos.Y]
          B = array[pos.X + step][pos.Y + 1]
          C = array[pos.X + step ][pos.Y + 2]
          D = array[pos.X ][pos.Y + 3]
        }
        if(pos.rot === 1){
          A = array[pos.X + step][pos.Y]
          B = array[pos.X + step + 1][pos.Y]
          C = array[pos.X + step + 2][pos.Y]
          D = array[pos.X + step + 3][pos.Y]
        }
        
  
        break
      }
      case 3:{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case 4:{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case 5:{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case 6:{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case 7:{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      default:{
        break
      }
    }

    // console.log('A', A)
    // console.log('B', B)
    // console.log('C', C)
    // console.log('D', D)

    
}
function setNextPos(sharp, pos, array){

}
const blue ={
  width:'50px',
  backgroundColor:'blue',
  height:'50px',
}

const white ={
  width:'50px',
  backgroundColor:'white',
  height:'50px',
}
function checkLinesIsFull(lines){
  for(let i = 0; i <= 10 ; i++){
    if(lines[i] === 0){
        return false      
    }
  }
  return true
}
function deleteFullLines(linesIndexToDelete, array){
  const numberOfLinesToDelete = linesIndexToDelete.length
  for(let i = 0; i < numberOfLinesToDelete + 1; i++){
    delete array[linesIndexToDelete[i]]
  } 
  for(let a = 0 ;a <  numberOfLinesToDelete + 1; i++){
      array.unshift(lines)
  }
  return array
}

function checkArray(array){
  let linesIndexToDelete=[]
  for(let i = 0; i <= 20 ; i++){
    if(checkLinesIsFull(array[i])){
      linesIndexToDelete.push(i)
    }
  }
   const cleanArray = deleteFullLines(linesIndexToDelete, array)
  return(cleanArray)
}

function rotate(pos, rot){
   switch(rot){
     case 0: return pos.Y + 4 + pos.X;
     case 1: return 12 + pos.Y - (pos.X * 4)
     case 2: return 15 - (pos.Y * 4) - pos.X
     case 3: return 3 - pos.Y + (pos.X * 4)
   }
   return 0
}
function addTetriminos(pos, prevPos,array, tetriminos){
    // const pos = {
    //     X:0,
    //     Y:5,
    //     rot:1
    // }
    // const pos2 ={
    //   X:0,
    //   Y:0,
    //   rot:0
    // }
    const step = 1
    //console.log('check pos',checkNextPos(1,pos,array,1))
  if(tetriminos === 1 && checkNextPos(1,pos,array,1)){
        // array[pos.X ][pos.Y ] = 'B'
        // console.log('0',array[pos.X ][pos.Y ])
        // array[pos.X ][pos.Y + 1]  = 'B'
        // console.log('1',array[pos.X ][pos.Y + 1])
        // array[pos.X + 1][pos.Y] = 'B'
        // console.log('2', array[pos.X + 1][pos.Y])
        // array[pos.X + 1][pos.Y + 1] = 0
        // console.log('3', array[pos.X + 1][pos.Y + 1])
      if(prevPos.X !== null && prevPos.Y !== null){
        array[prevPos.Y ][prevPos.X ] = 0
        array[prevPos.Y + 1][prevPos.X ]  = 0
        array[prevPos.Y][prevPos.X + 1] = 0
        array[prevPos.Y + 1][prevPos.X + 1] = 0
      }
        array[pos.Y ][pos.X ] = 'B'
        console.log('0',array[pos.X ][pos.Y ])
        array[pos.Y + 1][pos.X ]  = 'B'
        console.log('1',array[pos.Y + 1][pos.X ])
        array[pos.Y][pos.X + 1] = 'B'
        console.log('2', array[pos.X + 1][pos.Y])
        array[pos.Y + 1][pos.X + 1] = 'B'
        console.log('3', array[pos.X + 1][pos.Y + 1])
        console.log(array)
    }
    return array
}

function resetButton(){
  console.log('reset')
  store.dispatch(reset())
}
const PlayGround = (props) =>{
  console.log('STATE', store.getState())
  console.log('props', props)
  const { tetriData} = props

  const buttonValue = tetriData.start === true ? 'Pause' : 'Start'
  
 
  const pos ={
    X:tetriData.tetriminosPosX,
    Y:tetriData.tetriminosPosY,
  }
  const prevPos ={
    X:tetriData.prevPosX,
    Y:tetriData.prevPosY,
  }
      addTetriminos(pos,prevPos, tetriData.playground, 1)
      const array = tetriData.playground.map((row, key) =>{
        return(<div key={key}>{row}</div>)
    });
  return(
    <div>
      <h3 style={{ textAlign: 'center' }}>PlayGround</h3>

        {array}
      <button onClick={ start }>{buttonValue}</button>
      <button onClick={ resetButton }>Reset</button>
      {commandes()}
    </div>
  )
}

window.addEventListener('keydown', handleKeyUp )
//export const windowTick = window.setInterval(()=>{store.dispatch(tetriminosTick())} ,1000 )


export default connect(({ tetriminos}) => ({
  tetriData: tetriminos,
}))(PlayGround)
