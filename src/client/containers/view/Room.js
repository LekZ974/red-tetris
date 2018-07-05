import React from 'react'
import AbstractView from './base/AbstractView'
import { Box, Card } from '../../components/block'
import { Link, Route } from 'react-router-dom';

const Room = ({ match }) => {

  return(
    <Box width={'100%'} flex flexDirection='row' justifyContent='center'>
      <Card flex={1} width={'40em'}>
        <Box fontSize={30}>
          A ROOM
        </Box>
      </Card>
      <Route path={`${match.path}/:user`} render= {({match}) =>( <div> <h3> {match.params.name} </h3></div>)}/>
    </Box>
  )
}

export default Room

