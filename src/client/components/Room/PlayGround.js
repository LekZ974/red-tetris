import React, { Component } from 'react'
import { store } from '../../index'
import {move, reset, tetriminosTick, button} from '../../actions/tetriminos'


import { connect } from 'react-redux';
/**
 * Forme 
 *  1 O
 * 2 I
 * 3 T
 * 4 L
 * 5 J
 * 6 Z
 * 7 S
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

const blue = '#cbe6f2'

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
function checkNextPos(sharp, pos, array, step){

  let A = null
  let B = null
  let C = null
  let D = null

    switch(sharp):{
      case '1':{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case '2':{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X + step + 2][pos.Y]
        D = array[pos.X + step + 3][pos.Y]
        break
      }
      case '3':{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case '4':{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case '5':{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case '6':{
        A = array[pos.X + step][pos.Y]
        B = array[pos.X + step + 1][pos.Y]
        C = array[pos.X ][pos.Y + step]
        D = array[pos.X ][pos.Y + 1 + step]
        break
      }
      case '7':{
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

    if(A === 0 && B === 0
      && C === 0 && D === 0){
        return true
      }
    return false
}
function setNextPos(sharp, pos, array){

}
function addTetriminos(array, tetriminos){
    const pos = {
        X:0,
        Y:5
    }

    if(tetriminos === 1){
        if(array[pos.X + 1][pos.Y + 1] === 0){
            array[pos.X + 1][pos.Y + 1] = 1
       }
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
  console.log('=============', tetriData)

  const buttonValue = tetriData.start === true ? 'Pause' : 'Start'
  
 

      addTetriminos(tetriData.playground, 1)
      const array = tetriData.playground.map((row) =>{
        return(<div>{row}</div>)
    });
  return(
    <div>
      <h3 style={{ textAlign: 'center' }}>PlayGround</h3>

        {array}
      {/* <div className='tetris flex-container' style={flexContenaire}>
        <Tetriminos
          posX={tetriData.tetriminosPosX}
          posY={tetriData.tetriminosPosY <= 0 ? tetriData.tetriminosPosY : 0}
          rot={tetriData.rot}
          type={'l'}
        />
      </div> */}
      <button onClick={ start }>{buttonValue}</button>
      <button onClick={ resetButton }>Reset</button>
      {commandes()}
    </div>
  )
}

// window.addEventListener('keydown', handleKeyUp )
// export const windowTick = window.setInterval(()=>{store.dispatch(tetriminosTick())} ,1000 )


export default connect(({ tetriminos}) => ({
  tetriData: tetriminos,
}))(PlayGround)
