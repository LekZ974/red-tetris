import React, { Component } from 'react'
import { Link } from 'react-router-dom';

import {Button} from "../block";


const RoomInfo = (props) =>{

  const {game, user, updateGameStatus, leaveGame} = props

  function changeGameFlow(e) {
    const status = e.target.innerHTML
    updateGameStatus(status, game)
  }

  function leaveRoom() {
    leaveGame()
  }

  const buttonValue = game.start ? 'Pause' : 'Start'

  const styles = {
    buttonStart: {
      backgroundColor: '#40ed6d'
    },
    buttonPause: {
      backgroundColor: '#ff8b23'
    },
    buttonStop: {
      backgroundColor: '#ff001c'
    },
    link: {
      textDecoration: 'none',
      color: '#fff'
    }
  }

  return(
    <div>
      <div>RoomInfo</div>
      <h1>PLAYER:{user.name}</h1>
      <h1>ROOM:{game.name}</h1>
      {user.role === 'master' && <Button style={buttonValue === 'Start' ? styles.buttonStart : styles.buttonPause} onClick={changeGameFlow}>{buttonValue}</Button>}
      {user.role === 'master' && <Button style={styles.buttonStop} onClick={changeGameFlow}>Stop</Button>}
      <Button onClick={leaveRoom}><Link style={styles.link} to={'/'}>Leave Game</Link></Button>
    </div>
  )
}

export default RoomInfo
