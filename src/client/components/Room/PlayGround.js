import React  from 'react';
import Tada from 'react-reveal/Tada';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faUserNinja } from '@fortawesome/free-solid-svg-icons'

import {Box, Modal} from "../block";
import {Grid} from "./Grid"
import theme from "../../theme";

const PlayGround = (props) =>{

  const {user, displayResult, showResult} = props

  return(
    <Box style={{backgroundColor: theme.colors.gray, padding: '1em', height: '90vh'}}>
      <h3 style={{ textAlign: 'center', color: '#fff' }}>{'master' === user.role ? <Tada><FontAwesomeIcon style={{color: 'yellow'}} icon={faCrown}/></Tada> : <Tada><FontAwesomeIcon style={{color: '#ff8b23'}} icon={faUserNinja}/></Tada>} {user.name}</h3>
      {user.grid.length < 1 ?
        <Modal open={showResult} onClose={displayResult} >
        <Box center style={{padding: '1em',backgroundColor: theme.colors.red, color: theme.colors.white, fontSize: '2em', marginTop: '2em'}}>
          Your Score : {user.prevScore} !!!
        </Box>
        </Modal> :
        <Grid/>
      }
    </Box>
  )
}

export default PlayGround
