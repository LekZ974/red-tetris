import React  from 'react';
import Tada from 'react-reveal/Tada';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCrown, faUserNinja } from '@fortawesome/free-solid-svg-icons'
import Zoom from 'react-reveal/Zoom';

import {Box} from "../block";
import {Grid} from "./Grid"
import theme from "../../theme";

const PlayGround = (props) =>{

  const {user} = props

  return(
    <Box style={{backgroundColor: theme.colors.gray, padding: '1em', height: '90vh'}}>
      <h3 style={{ textAlign: 'center', color: '#fff' }}>{'master' === user.role ? <Tada><FontAwesomeIcon style={{color: 'yellow'}} icon={faCrown}/></Tada> : <Tada><FontAwesomeIcon style={{color: '#ff8b23'}} icon={faUserNinja}/></Tada>} {user.name}</h3>
      {user.grid.length < 1 ?
        <Tada>
          <Box center flex flexDirection='column' style={{backgroundColor: theme.colors.red, border: 'solid 5px', borderColor: `${theme.colors.gray} ${theme.colors.darkGray} ${theme.colors.darkGray} ${theme.colors.gray}`, padding: '1em', color: theme.colors.white, fontSize: '2em', fontWeight: 800, margin: '1em'}}>
            <Box style={{marginBottom: '1em'}} >Your Score :</Box>
            <Box style={{fontSize: '2.5em'}}>{user.prevScore}</Box>
          </Box>
        </Tada>
        :
        <Grid/>
      }
    </Box>
  )
}

export default PlayGround
