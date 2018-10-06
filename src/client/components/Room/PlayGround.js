import React, { Component } from 'react'
const lines=[0,0,0,0,0,0,0,0,0,0]
import { connect } from 'react-redux';
import * as TetriService from '../../services/TetriService';
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


const PlayGround = (props) =>{

  const {
    tetrimino,
    grid,
  } = props


  let array = TetriService.addTetriminos(tetrimino, grid).map((row, key) =>{
    return(<div key={key}>{row}</div>)
  });

  return(
    <div>
      <h3 style={{ textAlign: 'center' }}>PlayGround</h3>
      <div>
        {array}
      </div>
      {commandes()}
    </div>
  )
}

function mapStateToProps(state){
  const grid = state.user.grid
  const tetrimino = state.tetrimino
  return {tetrimino, grid}
}



export default connect(mapStateToProps)(PlayGround)
