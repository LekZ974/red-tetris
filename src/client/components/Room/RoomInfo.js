import React  from 'react'
import Color from 'color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Jump from 'react-reveal/Jump';


import {Button, Box, Modal} from "../block";


const commandes = () => (
  <Box style={{ borderRadius: '5px, solid blue' }}>
    <h2 style={{ textAlign: 'center' }}>Commandes</h2>
    <span style={{ marginRight: '60px' }}>&rarr; ou &larr;</span> Déplacement horizontal à gauche ou à droite<br/>
    <span style={{ marginRight: '110px' }}>&uarr;</span>Rotation<br/>
    <span style={{ marginRight: '110px' }}>&darr;</span>Chute en direction du tas<br/>
    <span style={{ marginRight: '55px', height: '16px', width: '100px', border: '1px solid black', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', fontSize: '10px' }}>Space</span>
    Déplacement vertical afin de positionner une pièce dans un trou du tas<br/>
  </Box>
)

const RoomInfo = (props) =>{

  const {game, user, updateGameStatus, leaveGame, history, gameSound, displayCommand, showCommand} = props

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
      backgroundColor: '#40ed6d',
      '& :hover': {
        backgroundColor: Color('#40ed6d').darken(0.15),
      }
    },
    buttonDisabled: {
      backgroundColor: '#c9c4ce'
    },
    buttonStop: {
      backgroundColor: '#ff001c'
    },
    link: {
      textDecoration: 'none',
      color: '#fff',
    },
    buttonShowCommand: {
      backgroundColor: '#ff8b23',
    }
  }

  return(
    <Box flex flexDirection={'column'} container center>
      <Box flex flexDirection={'column'}>
        <h1><Jump><FontAwesomeIcon icon={faChessRook} /> Room :</Jump></h1>
        <Box style={{marginTop: '-45px'}}>
          <h1>{game.name}</h1>
        </Box>
      </Box>
      {user.role === 'master' &&
      <Box>
        <Button customClass={!game.start && !game.gameIsStarted ? styles.buttonStart : styles.buttonDisabled} onClick={changeGameFlow} disabled={game.start || game.gameIsStarted}>
        {buttonValue}
        </Button>
      </Box>}
      <Box>
        <Button onClick={leaveRoom}>
          <div style={styles.link}>Leave Game</div>
        </Button>
      </Box>
      <Box onClick={() => gameSound()}>
        {game.params.sound ?
          <FontAwesomeIcon icon={faVolumeUp}/> :
          <FontAwesomeIcon icon={faVolumeMute}/>
        }
      </Box>
      <Box style={{clear:'both', paddingTop:'7em'}} center flex flexDirection={'column'}>
        <Modal open={showCommand} onClose={displayCommand}>
          {commandes()}
        </Modal>
        <Button customClass={styles.buttonShowCommand} onClick={() => displayCommand()}>
          Show Command
        </Button>
      </Box>
    </Box>
  )
}

export default RoomInfo
