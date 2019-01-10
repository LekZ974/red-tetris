import React  from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook } from '@fortawesome/free-solid-svg-icons'
import Jump from 'react-reveal/Jump';
import ConfigForm from '../../containers/form/ConfigForm'

import {Button, Box, Input} from "../block";


const RoomInfo = (props) =>{

  const {game, user, updateGameStatus, leaveGame, history} = props

  function changeGameFlow(e) {
    const status = e.target.innerHTML
    updateGameStatus(status, game)
  }

  function leaveRoom() {
    leaveGame()
    history.push('/')
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
      <Box flex flexDirection={'column'}>
        <h1><Jump><FontAwesomeIcon icon={faChessRook} /> Room :</Jump></h1>
        <Box style={{marginTop: '-45px'}}>
          <h1>{game.name}</h1>
        </Box>
        {/*{user.role === 'master' &&*/}
          {/*<Box>*/}
            {/*<ConfigForm {...props} />*/}
          {/*</Box>*/}
        {/*}*/}
      </Box>
      {user.role === 'master' && <Box><Button style={!game.start && !game.gameIsStarted ? styles.buttonStart : styles.buttonDisabled} onClick={changeGameFlow} disabled={game.start || game.gameIsStarted}>{buttonValue}</Button></Box>}
      <Box><Button onClick={leaveRoom}><div style={styles.link}>Leave Game</div></Button></Box>
    </Box>
  )
}

export default RoomInfo
