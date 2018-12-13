import React  from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook } from '@fortawesome/free-solid-svg-icons'
import Jump from 'react-reveal/Jump';

import {Button, Box} from "../block";


const RoomInfo = (props) =>{

  const {game, user, updateGameStatus, leaveGame} = props

  function changeGameFlow(e) {
    const status = e.target.innerHTML
    updateGameStatus(status, game)
  }

  function leaveRoom() {
    leaveGame()
  }

  const buttonValue = !game.start && game.round > 1 ? 'Restart' : 'Start'

  const styles = {
    buttonStart: {
      backgroundColor: '#40ed6d'
    },
    buttonDisabled: {
      backgroundColor: '#c9c4ce'
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
    <Box flex flexDirection={'column'} container center>
      <Box>RoomInfo</Box>
      <Box flex flexDirection={'row'}>
        <h1><Jump><FontAwesomeIcon icon={faChessRook} /> Room :</Jump></h1>
      </Box>
      <Box style={{marginTop: 0}}>
        <h1>{game.name}</h1>
      </Box>
      {user.role === 'master' && <Box><Button style={!game.start && !game.gameIsStarted ? styles.buttonStart : styles.buttonDisabled} onClick={changeGameFlow} disabled={game.start || game.gameIsStarted}>{buttonValue}</Button></Box>}
      <Box><Button onClick={leaveRoom}><Link style={styles.link} to={'/'}>Leave Game</Link></Button></Box>
    </Box>
  )
}

export default RoomInfo
