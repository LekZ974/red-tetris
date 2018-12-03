import React  from 'react';
import Tada from 'react-reveal/Tada';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faUserNinja } from '@fortawesome/free-solid-svg-icons'

import {Box, Modal, Button} from "../block";
import {Grid} from "./Grid"
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
  <Box style={{ borderRadius: '5px, solid blue' }}>
    <h2 style={{ textAlign: 'center' }}>Commandes</h2>
    <span style={{ marginRight: '60px' }}>&rarr; ou &larr;</span> Déplacement horizontal à gauche ou à droite<br/>
    <span style={{ marginRight: '110px' }}>&uarr;</span>Rotation<br/>
    <span style={{ marginRight: '110px' }}>&darr;</span>Chute en direction du tas<br/>
    <span style={{ marginRight: '55px', height: '16px', width: '100px', border: '1px solid black', textAlign: 'center', paddingLeft: '20px', paddingRight: '20px', fontSize: '10px' }}>Space</span>
      Déplacement vertical afin de positionner une pièce dans un trou du tas<br/>
  </Box>
)

const PlayGround = (props) =>{

  const {displayCommand, showCommand, user} = props

  return(
    <Box style={{backgroundColor: '#48637a', padding: '1em', height: '100%'}}>
      <h3 style={{ textAlign: 'center', color: '#fff' }}>{'master' === user.role ? <Tada><FontAwesomeIcon style={{color: 'yellow'}} icon={faCrown}/></Tada> : <Tada><FontAwesomeIcon style={{color: '#ff8b23'}} icon={faUserNinja}/></Tada>} {user.name}</h3>
      <Grid/>
      <Box style={{clear:'both', paddingTop:'12em'}} center flex flexDirection={'column'}>
        <Modal open={showCommand} onClose={displayCommand}>
          {commandes()}
        </Modal>
        <Button
          style={{backgroundColor:'#ff8b23'}}
          onClick={() => displayCommand()}
        >
          Show Command
        </Button>
      </Box>
    </Box>
  )
}

export default PlayGround
