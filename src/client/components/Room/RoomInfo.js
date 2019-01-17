import React  from 'react'
import Color from 'color'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChessRook, faVolumeMute, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Jump from 'react-reveal/Jump';
import Fade from 'react-reveal/Fade';
import theme from '../../theme';

import {Button, Box, Modal} from "../block";


const commandes = () => (
  <Box style={{ borderRadius: '5px, solid blue' }} flex flexDirection='column'>
    <Box center flex={1} style={{fontSize: '2em', color: theme.colors.red}}>Commandes</Box>
    <Box flex flexDirection='row' justifyCotent={'space-between'}>
      <Box style={{width: '6em'}}>
        <span style={{ width: '50px' }}>&rarr; ou &larr;</span>
      </Box>
      <Box>Déplacement horizontal à gauche ou à droite</Box>
    </Box>
    <Box flex flexDirection='row' justifyCotent={'space-between'}>
      <Box style={{width: '6em'}}>
        <span style={{ width: '50px' }}>&uarr;</span>
      </Box>
      <Box>Rotation</Box>
    </Box>
    <Box flex flexDirection='row' justifyCotent={'space-between'}>
      <Box style={{width: '6em'}}>
        <span style={{ width: '50px' }}>&darr;</span>
      </Box>
      <Box>Déplacement vers le tas</Box>
    </Box>
    <Box flex flexDirection='row' justifyCotent={'space-between'}>
      <Box style={{width: '6em'}}>
        <span style={{ height: '16px', width: '100px', border: '1px solid black', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', fontSize: '10px' }}>Space
        </span>
      </Box>
      <Box>Chute dans le tas</Box>
    </Box>
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
      <Fade left big>
        <Box style={{marginBottom: '2em', fontWeight: 800, color: theme.colors.white, backgroundColor: theme.colors.red, padding: '0 3em', border: 'solid 5px', borderColor: `${theme.colors.gray} ${theme.colors.darkGray} ${theme.colors.darkGray} ${theme.colors.gray}`}}>
          <Box flex flexDirection={'row'}>
            <h1 style={{display: 'inherit'}}>
              <Jump>
                <Box style={{marginRight: '0.5em'}}>
                  <FontAwesomeIcon icon={faChessRook}  />
                </Box>
              </Jump>
                Room :
            </h1>
            <Box>
              <h1>{game.name}</h1>
            </Box>
          </Box>
        </Box>
      </Fade>
      {user.role === 'master' &&
      <Box>
        <Button customClass={!game.start && !game.gameIsStarted ? styles.buttonStart : styles.buttonDisabled} onClick={changeGameFlow} disabled={game.start || game.gameIsStarted}>
        {buttonValue}
        </Button>
      </Box>
      }
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
