import React  from 'react';
import Tada from 'react-reveal/Tada';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faUserNinja } from '@fortawesome/free-solid-svg-icons'

import {Box} from "../block";
import {Grid} from "./Grid"

const PlayGround = (props) =>{

  const {user} = props

  return(
    <Box style={{backgroundColor: '#48637a', padding: '1em', height: '90vh'}}>
      <h3 style={{ textAlign: 'center', color: '#fff' }}>{'master' === user.role ? <Tada><FontAwesomeIcon style={{color: 'yellow'}} icon={faCrown}/></Tada> : <Tada><FontAwesomeIcon style={{color: '#ff8b23'}} icon={faUserNinja}/></Tada>} {user.name}</h3>
      <Grid/>
    </Box>
  )
}

export default PlayGround
